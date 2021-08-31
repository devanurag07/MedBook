import datetime
from django.contrib.auth.decorators import permission_required
from django.contrib.auth.models import Group
from django.db.models import Q
from django.utils.decorators import method_decorator
from rest_framework import permissions
from rest_framework import viewsets, status
from rest_framework.decorators import list_route, action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework_jwt.settings import api_settings
from generics.Mailer import Mailer
from generics.custom_exceptions import CustomValidationErr
from generics.defaults import AppDefaults
from users.models import QMUser, PasswordResetTokens, Roles
from users.serializers import UsersSerializer, GroupSerializer


def jwt_response_payload_handler(token, user=None, request=None):
    """ Modifying jwt login response details """
    user_details = UsersSerializer(user, context={'request': request}).data

    """ Fetching assigned accesses for the use """
    user_details['accesses'] = list()

    if user.is_superuser:
        user_details['accesses'] = AppDefaults.get_predefined_role_access_specifiers('Admin')
    else:
        access_joined = user.groups.all().values_list('details__accesses', flat=True)
        for string in access_joined:
            if string is not None:
                user_details['accesses'] += string.split(',')
        user_details['accesses'] = list(set(user_details['accesses']))

    user_details['accesses'] = sorted(user_details['accesses'])

    return {
        'token': token,
        'user': user_details
    }


@method_decorator(permission_required('users.view_qmuser', raise_exception=True), name='list')
@method_decorator(permission_required('users.view_qmuser', raise_exception=True), name='retrieve')
@method_decorator(permission_required('users.add_qmuser', raise_exception=True), name='create')
@method_decorator(permission_required('users.change_qmuser', raise_exception=True), name='update')
@method_decorator(permission_required('users.change_qmuser', raise_exception=True), name='partial_update')
@method_decorator(permission_required('users.delete_qmuser', raise_exception=True), name='destroy')
class UsersViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = QMUser.objects.all()
    serializer_class = UsersSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            query_set = QMUser.objects.all()
        else:
            query_set = self.queryset.filter(profile__created_by=user)
        return query_set

    def destroy(self, request, *args, **kwargs):
        #self.get_queryset().filter(id=kwargs['pk']).update(is_active=0)
        QMUser.objects.filter(id=kwargs['pk']).delete()
        return Response(True)

    @action(methods=['post'], detail=False, url_path='check-username')
    def check_user_list(self, request, *args, **kwargs):
        user_name = request.data['username']
        queryset = QMUser.objects.filter(username=user_name)
        check_exist = len(queryset)
        return Response(check_exist)

    @action(methods=['get'], detail=False, url_path='get-customers')
    def get_customers(self, request, *args, **kwargs):
        from generics.constants import CUSTOMERS_USER_TYPE
        user_role = Roles.objects.filter(alias=CUSTOMERS_USER_TYPE).first()
        query_set = QMUser.objects.filter(profile__role_id=user_role.id, profile__created_by=self.request.user)
        query_params = request.query_params.dict()
        search_text = query_params.pop('searchText', None)
        if search_text is not None:
            query_set = query_set.filter(
                Q(first_name__icontains=search_text) |
                Q(profile__mobile__icontains=search_text) |
                Q(email__icontains=search_text) |
                Q(last_name__icontains=search_text))
        values = query_set.values('id', 'first_name')
        return Response(values)

    def create(self, request, *args, **kwargs):
        request.data['user_id'] = request.user.id
        from django.utils.crypto import get_random_string
        if 'role_id' not in request.data:
            user_role = Roles.objects.filter(alias='Customers').first()
            request.data['user_type'] = 'Customers'
            request.data['role_id'] = user_role.id
        password = get_random_string(length=7)
        request.data['password'] = password
        user = super(self.__class__, self).create(request, *args, **kwargs)
        user_id = user.data['id']
        u = QMUser.objects.get(pk=user_id)
        u.set_password(password)
        u.save()
        serializer = self.serializer_class(u, context={'request': request})
        user_data = serializer.data
        if 'customer' in request.data:
            from common.fastsms import send_message
            message = 'Dear %s, a warm welcome to MyMedbook. One place to manage all your health records.\n\nLogin details \n Username: %s \nPassword: %s \n\nTeam MyMedbook' \
                      % (user_data['first_name'], user_data['username'], password)
            data = send_message(user_data['mobile'], message)
            if data.status_code == 200:
                json_data = data.json()
                return Response({'fast2sms': json_data, 'user': user_data})
            else:
                Response(True)
        return Response(True)

    def update(self, request, *args, **kwargs):
        user_id = kwargs['pk']
        password = request.data['password']
        request.data.pop('password', None)
        super(self.__class__, self).update(request, *args, **kwargs)
        u = QMUser.objects.get(pk=user_id)
        if u.password != password:
            u.set_password(password)
            u.save()
        return Response(True)

    @action(methods=['post'], detail=False, url_path='update-profile')
    def update_profile(self, request):
        user = self.request.user
        user.first_name = request.data['first_name']
        user.save()
        if hasattr(user,'profile'):
            profile = user.profile
        else:
            from users.models import UserProfile
            user_role = Roles.objects.filter(alias='Admin').first()
            profile = UserProfile()
            profile.user = user
            profile.role_id = user_role.id
            profile.user_type = 'Admin'
            profile.created_by = QMUser.objects.first()
        profile.mobile = request.data['mobile']
        profile.address_line1 = request.data['address_line1']
        if 'agreement_file' in request.FILES:
            profile.agreement_file = request.FILES['agreement_file']
            profile.document_rejected = False
        if 'clinic_name' in request.data:
            profile.clinic_name = request.data['clinic_name']
        profile.save()
        user_details = UsersSerializer(user, context={'request': request}).data
        return Response(user_details)

    @action(methods=['post'], detail=False, url_path='update-customer')
    def update_customer(self, request):
        user = QMUser.objects.get(id=request.data['id'])
        user.first_name = request.data['first_name']
        user.username = request.data['email']
        user.email = request.data['email']
        user.save()
        profile = user.profile
        profile.mobile = request.data['mobile']
        profile.address_line1 = request.data['address_line1']
        profile.save()
        user_details = UsersSerializer(user, context={'request': request}).data
        return Response(user_details)

    @action(methods=['post'], detail=False, url_path='activate-customer')
    def activate_customer(self, request):
        user = QMUser.objects.get(id=request.data['id'])
        profile = user.profile
        profile.document_verified = True
        profile.document_rejected = False
        profile.save()
        return Response(True)

    @action(methods=['post'], detail=False, url_path='reject-customer')
    def reject_customer(self, request):
        user = QMUser.objects.get(id=request.data['id'])
        profile = user.profile
        profile.document_rejected = True
        profile.save()
        return Response(True)

    @action(methods=['post'], detail=False, url_path='change-password')
    def change_password(self, request):
        user = self.request.user
        old_password = request.data['old_password']
        from django.contrib.auth import authenticate
        credentials = {
            'email': user.email,
            'password': old_password
        }
        user = authenticate(**credentials)
        if user:
            user.set_password(request.data['password'])
            user.save()

            return Response({'msg': "Your Password changed"})
        else:
            return Response({'msg': "Your old password was entered incorrectly"}, status=400)

    def list(self, request, *args, **kwargs):
        query_params = request.query_params.dict()
        offset = int(query_params.pop('offset', 0))
        end = int(query_params.pop('limit', 5))
        username_list = [request.user.username, 'AnonymousUser']
        queryset = self.get_queryset().filter(is_active=1).exclude(username__in=username_list)
        order_by = query_params.pop('order_by', None)
        search_text = query_params.pop('searchText', None)
        customer = query_params.pop('customer', None)
        document_verification = query_params.pop('documentVerification', None)
        query_set = queryset

        if search_text is not None:
            query_set = query_set.filter(
                Q(first_name__icontains=search_text) |
                Q(email__icontains=search_text) |
                Q(last_name__icontains=search_text))

        from generics.constants import CUSTOMERS_USER_TYPE,Doctors_USER_TYPE
        user_role = Roles.objects.filter(alias=CUSTOMERS_USER_TYPE).first()
        doctor_role = Roles.objects.filter(alias=Doctors_USER_TYPE).first()
        if customer is not None:
            query_set = query_set.filter(profile__role_id=user_role.id)
        else:
            query_set = query_set.exclude(profile__role_id=user_role.id)

        if document_verification is not None:
            query_set = query_set.filter(profile__role_id=doctor_role.id)
        if order_by is not None:
            if order_by == 'full_name' or order_by == '-full_name':
                order_by = order_by.replace('full_name', 'first_name')
            query_set = query_set.order_by(order_by)

        total_records = query_set.filter(is_active=1).count()
        query_set = query_set[offset:end]
        serializer = UsersSerializer(query_set, many=True, context={'request': request})
        return Response({'records': serializer.data, 'totalRecords': total_records})


class GroupsViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = GroupSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Group.objects.none()
        if user.is_superuser:
            queryset = Group.objects.filter((Q(details__created_by=user) | Q(details__created_by=None))) \
                .exclude(details__alias__isnull=True)
        else:
            queryset = Group.objects.filter(details__created_by=user).exclude(details__alias__isnull=True)

        return queryset.order_by('details__alias')

    @action(methods=['get'], detail=True, url_path='delete_role')
    def delete_role_check(self, request, **kwargs):
        role_id = kwargs["pk"]
        role_name = Group.objects.get(id=role_id)
        user_list = role_name.user_set.exclude(is_active=0).all()
        user = user_list.exists()
        predefined = AppDefaults.get_predefined_roles()
        predefined_value = role_name.name in predefined.values()
        if predefined_value:
            return Response(False)
        elif user:
            return Response("exists")
        else:
            return Response(True)

    def destroy(self, request, *args, **kwargs):
        id = kwargs["pk"]
        query = self.get_queryset().get(id=id)
        query.details.delete()
        queryset = self.get_queryset()
        serializer = GroupSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)


class PasswordReset(APIView):
    """ Generates password reset token and reset link """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        data = request.data

        """ Checking is user exists for the provided username """
        if not QMUser.objects.filter(username=data['username']).exists():
            raise CustomValidationErr("Username doesn't exists.")

        user = QMUser.objects.get(username=data['username'])

        """ Verifying users email """
        if user.email != data['email']:
            email = user.email

            last = len(user.email) - 1
            at_sign_position = email.index('@')
            dot_position = email.index('.')

            email_hint = '%s%s%s%s%s' % (
                email[0:2],
                '*' * len(email[2:at_sign_position]),
                email[at_sign_position:(at_sign_position + 2)],
                '*' * (dot_position - (at_sign_position + 2)),
                email[dot_position:(last + 1)]
            )
            raise CustomValidationErr("Email couldn't match with username. Hint: %s" % email_hint)

        """ Generating token for password reset link """
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(user)
        """ Setting expiration time """
        payload['exp'] = datetime.datetime.now() + datetime.timedelta(days=30)
        token = jwt_encode_handler(payload)

        """ Storing token for future reference """
        session = PasswordResetTokens.objects.create(user=user, token=token)
        session.save()

        Mailer.send_mail(
            subject='MyMedBook: Password reset link',
            recipients=[user.email],
            template_name='password_resetting.html',
            template_data={
                'user': user.__dict__,
                'reset_link': '%s?tk=%s' % (data['base_path'], token)
            }
        )

        return Response({'msg': "Reset link sent successfully", 'email': user.email})


class PasswordResetVerify(APIView):
    """ Verifies password reset token """
    permission_classes = (permissions.AllowAny,)
    serializer_class = VerifyJSONWebTokenSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            if PasswordResetTokens.objects.filter(token=data['token']).exists():
                return Response(data['token'])
            else:
                raise CustomValidationErr('It seems that link has been used already.')

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirm(APIView):
    """ Changes user password """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data

        """ Updating password """
        user.set_password(data['password'])
        user.save()
        """ Removing token from password reset session after changing password """
        session = PasswordResetTokens.objects.filter(user=user)
        session.delete()

        Mailer.send_mail(
            subject='REDINGTON: Password changed',
            recipients=[user.email],
            template_name='password_changed.html',
            template_data={
                'user': user.__dict__
            }
        )

        serializer = UsersSerializer(user, context={'request': request})
        return Response(serializer.data)


api_password_reset = PasswordReset.as_view()
api_password_reset_verify = PasswordResetVerify.as_view()
api_password_reset_confirm = PasswordResetConfirm.as_view()
