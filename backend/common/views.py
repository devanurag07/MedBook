from rest_framework import permissions
from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.decorators import action
from generics.constants import DEFAULT_USER_TYPE
from users.serializers import UsersSerializer
from users.models import QMUser, UserProfile, Group, Roles
from generics.Mailer import Mailer
import random
from rest_framework_jwt.settings import api_settings
from common.serializers import OtpRequestSerializer
from common.models import OtpRequests, ApiKeys
from common.utils import generate_api_key
from common.decorators import is_system_key_alive
from common.fastsms import send_message
from rest_framework.decorators import api_view, permission_classes
import datetime
from common.models import OTPVerification


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def generate_api_keys(request, **kwargs):
    r_data = dict()
    r_status = 200
    try:
        ip, token = generate_api_key(request)
        api_key = ApiKeys()
        api_key.ip = ip
        api_key.token = token
        api_key.save()
        r_data['key'] = token
    except Exception as e:
        r_status = 400
        r_data['error'] = 'Failed to get api keys'
    return Response(r_data, status=r_status)


class OtpRequestViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = OtpRequestSerializer
    queryset = OtpRequests.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.queryset[:25]
        serializer = self.serializer_class(queryset, context={'request': request}, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        request.data['otp'] = random.randrange(1, 10 ** 6)
        request.data['phone_number'] = request.data['mobile']
        message = 'Your Verification code is %s. valid 5 minutes only' % request.data['otp']
        OtpRequests.objects.filter(phone_number=request.data['mobile']).update(status=True)
        data = send_message(request.data['mobile'], message)
        try:
            json_data = data.json()
            if data.status_code == 200:
                otp_instance = OtpRequests()
                otp_instance.__dict__.update(request.data)
                otp_instance.save()
                data = self.serializer_class(otp_instance, context={'request': request}).data
                return Response(data)
            else:
                return Response(json_data, status=400)
        except:
            return Response(data, status=400)

    @action(methods=['post'], detail=False, url_path='resend')
    def resend_otp(self, request, *args, **kwargs):
        form_data = request.data
        opt_exist = OtpRequests.objects.filter(phone_number=form_data['mobile'], status=False).first()
        if opt_exist:
            otp_instance = OtpRequests.objects.filter(phone_number=form_data['mobile'], status=False).get()
            message = 'Your Verification code is %s. valid 5 minutes only' % otp_instance.otp
            # data = Mailer.send_sms(message, otp_instance.phone_number, otp_instance.otp)
            data = send_message(request.data['mobile'], message)
            if data.status_code == 200:
                data = self.serializer_class(otp_instance, context={'request': request}).data
            return Response(data)
        else:
            data = dict()
            data['message'] = "Invalid phone number"
            return Response(data, status=400)

    @action(methods=['post'], detail=False, url_path='verify')
    def verify(self, request, *args, **kwargs):
        '''
                        from generics.Mailer import Mailer
                        verify_data = Mailer.verify_otp(form_data['phone_number'], form_data['otp'], 'mobile')
                        if verify_data['type'] == 'success':
                            OtpRequests.objects.filter(phone_number=form_data['phone_number'], otp=form_data['otp']).update(status=True)
                            user_exist = QMUser.objects.filter(username=request.data['phone_number']).first()
                            if user_exist:
                                user = QMUser.objects.get(username=request.data['phone_number'])
                                user.set_password(form_data['otp'])
                                user.save()
                            else:
                                form_data['username'] = form_data['phone_number']
                                form_data['email'] = form_data['phone_number']
                                user = QMUser()
                                user.__dict__.update(**form_data)
                                user.save()
                                user_role = Roles.objects.filter(alias=DEFAULT_USER_TYPE).first()
                                permission_groups = Group.objects.filter(id=user_role.id)
                                user.set_password(form_data['otp'])
                                user.save()
                                user.groups.set(permission_groups)
                                user.save()
                                user_profile = UserProfile()
                                user_profile.user = user
                                user_profile.role_id = user_role.id
                                user_profile.user_type = DEFAULT_USER_TYPE
                                user_profile.created_by = QMUser.objects.first()
                                user_profile.mobile = form_data['phone_number']
                                user_profile.save()
                            user_details = UsersSerializer(user, context={'request': request}).data
                            # handle the users token's
                            payload_handler = api_settings.JWT_PAYLOAD_HANDLER
                            encode_handler = api_settings.JWT_ENCODE_HANDLER
                            payload = payload_handler(user)
                            token = encode_handler(payload)
                            user_details['token'] = token
                            return Response(user_details)
                        else:
                            return Response(verify_data)
                        '''
        form_data = request.data
        otp_exist = OtpRequests.objects.filter(phone_number=form_data['mobile'], otp=form_data['otp']).first()
        if otp_exist:
            OtpRequests.objects.filter(phone_number=request.data['mobile']).update(status=True)
            form_data['username'] = form_data['email']
            form_data['email'] = form_data['email']
            user = QMUser()
            user.__dict__.update(**form_data)
            user.save()
            user_role = Roles.objects.filter(alias='Doctors').first()
            permission_groups = Group.objects.filter(id=user_role.id)
            user.set_password(form_data['password'])
            user.save()
            user.groups.set(permission_groups)
            user.save()
            user_profile = UserProfile()
            user_profile.user = user
            user_profile.role_id = user_role.id
            user_profile.user_type = DEFAULT_USER_TYPE
            user_profile.created_by = QMUser.objects.first()
            user_profile.mobile = form_data['mobile']
            user_profile.subscription_active_at = datetime.datetime.now() + datetime.timedelta(days=2 * 30)
            user_profile.save()
            user_details = UsersSerializer(user, context={'request': request}).data
            # handle the users token's
            payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            encode_handler = api_settings.JWT_ENCODE_HANDLER
            payload = payload_handler(user)
            token = encode_handler(payload)
            user_details['token'] = token
            return Response(user_details)
        else:
            data = dict()
            data['message'] = "Please enter valid otp"
            return Response(data, status=400)

    @action(methods=['post'], detail=False, url_path='create-user')
    def create_user(self, request, *args, **kwargs):
        form_data = request.data
        form_data['username'] = form_data['email']
        form_data['email'] = form_data['email']
        user = QMUser()
        user.__dict__.update(**form_data)
        user.save()
        user_role = Roles.objects.filter(alias='Doctors').first()
        permission_groups = Group.objects.filter(id=user_role.id)
        user.set_password(form_data['password'])
        user.save()
        user.groups.set(permission_groups)
        user.save()
        user_profile = UserProfile()
        user_profile.user = user
        user_profile.role_id = user_role.id
        user_profile.user_type = 'D'
        user_profile.created_by = QMUser.objects.first()
        user_profile.mobile = form_data['mobile']
        user_profile.subscription_active_at = datetime.datetime.now() + datetime.timedelta(days=2 * 30)
        user_profile.save()
        user_details = UsersSerializer(user, context={'request': request}).data
        # handle the users token's
        payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = payload_handler(user)
        token = encode_handler(payload)
        user_details['token'] = token
        return Response(user_details)

    @action(methods=['post'], detail=False, url_path='check-email-exist')
    def check_email_exist(self, request, **kwargs):
        qs = QMUser.objects.filter(username=request.data['email'])
        if 'user_id' in request.data and request.data['user_id'] is not None:
            qs = qs.exclude(id=request.data['user_id'])
        # user = qs.first()
        return_data = dict()
        if len(qs) > 0:
            return_data['exist'] = True
            return Response(return_data, status=400)
        else:
            return_data['exist'] = False
            return Response(return_data)

    @action(methods=['post'], detail=False, url_path='check-mobile-exist')
    def check_mobile_exist(self, request, **kwargs):
        qs = UserProfile.objects.filter(mobile=request.data['email'])
        if 'user_id' in request.data and request.data['user_id'] is not None:
            qs = qs.exclude(user_id=request.data['user_id'])
        profile = qs.first()
        return_data = dict()
        if len(qs) > 0:
            return_data['exist'] = True
            return Response(return_data, status=400)
        else:
            return_data['exist'] = False
            return Response(return_data)

    @action(methods=['post'], detail=False, url_path='check-customer-email-exist')
    def check_customer_email_exist(self, request, **kwargs):
        qs = QMUser.objects.filter(username=request.data['email'])
        if 'user_id' in request.data and request.data['user_id'] is not None:
            qs = qs.exclude(id=request.data['user_id'])
        return_data = dict()
        if len(qs) > 0:
            from generics.constants import CUSTOMERS_USER_TYPE
            user_role = Roles.objects.filter(alias=CUSTOMERS_USER_TYPE).first()
            updated_qs = qs.filter(role_id=user_role.id)
            if len(updated_qs) > 0:
                return_data['exist'] = True
                return Response(return_data)
            return_data['exist'] = True
            return Response(return_data, status=400)
        else:
            return_data['exist'] = False
            return Response(return_data)

    @action(methods=['post'], detail=False, url_path='check-customer-mobile-exist')
    def check_customer_mobile_exist(self, request, **kwargs):
        qs = UserProfile.objects.filter(mobile=request.data['email'])
        if 'user_id' in request.data and request.data['user_id'] is not None:
            qs = qs.exclude(user_id=request.data['user_id'])
        return_data = dict()
        if len(qs) > 0:
            from generics.constants import CUSTOMERS_USER_TYPE
            user_role = Roles.objects.filter(alias=CUSTOMERS_USER_TYPE).first()
            updated_qs = qs.filter(role_id=user_role.id)
            if len(updated_qs) > 0:
                return_data['exist'] = True
                return Response(return_data)
            return_data['exist'] = True
            return Response(return_data, status=400)
        else:
            return_data['exist'] = False
            return Response(return_data)

    @action(methods=['post'], detail=False, url_path='check_exist')
    def check_exist(self, request, **kwargs):
        form_data = request.data
        user = QMUser.objects.filter(username=form_data['phone_number']).first()
        profile = UserProfile.objects.filter(mobile=form_data['phone_number']).first()
        return_data = dict()
        if user is not None and profile is not None:
            return_data['exist'] = True
        else:
            return_data['exist'] = False
        return Response(return_data)

    @action(methods=['post'], detail=False, url_path='auth-login')
    def auth_login(self, request, **kwargs):
        try:
            form_data = request.data
            user = QMUser.objects.filter(username=form_data['username']).first()
            if user is None:
                profile = UserProfile.objects.filter(mobile=form_data['username']).first()
                user = profile.user
            if user is None:
                return Response(False, status=400)
            from django.contrib.auth import authenticate
            credentials = {
                'username': user.username,
                'password': form_data['password']
            }
            auth_user = authenticate(**credentials)
            if auth_user:
                user_details = UsersSerializer(auth_user, context={'request': request}).data
                # handle the users token's
                payload_handler = api_settings.JWT_PAYLOAD_HANDLER
                encode_handler = api_settings.JWT_ENCODE_HANDLER
                payload = payload_handler(user)
                token = encode_handler(payload)
                user_details['token'] = token
                return Response(user_details)
            return Response(False, status=400)
        except Exception as e:
            return Response(False, status=400)

    @action(methods=['post'], detail=False, url_path='reset-password-otp')
    def reset_password_otp(self, request, **kwargs):
        try:
            form_data = request.data
            user = QMUser.objects.filter(username=form_data['mobile']).first()
            if user is None:
                profile = UserProfile.objects.filter(mobile=form_data['mobile']).first()
                user = profile.user
            mobile = user.profile.mobile
            otp = random.randrange(1, 10 ** 6)
            message = 'Your Verification code is %s. valid 5 minutes only' % otp
            data = send_message(mobile, message)
            json_data = data.json()
            OTPVerification.objects.filter(email=request.data['mobile']).update(deleted=True)
            if data.status_code == 200:
                otp_instance = OTPVerification()
                otp_instance.email = form_data['mobile']
                otp_instance.otp = otp
                otp_instance.save()
                json_data['user_id'] = user.id
                return Response(json_data)
            else:
                return Response(json_data, status=400)
        except Exception as e:
            return Response(False, status=400)

    @action(methods=['post'], detail=False, url_path='verify-reset-password-otp')
    def verify_reset_password_otp(self, request, **kwargs):
        otp_object = OTPVerification.objects \
            .filter(email=request.data['mobile'], otp=request.data['otp'], deleted=False).first()
        if otp_object:
            otp_object.deleted = True
            otp_object.save()
            return Response(True, status=200)
        return Response(False, status=400)

    @action(methods=['post'], detail=False, url_path='set-new-password')
    def set_new_password(self, request, **kwargs):
        form_data = request.data
        user = QMUser.objects.get(id=form_data['user_id'])
        user.set_password(form_data['password'])
        user.save()
        return Response(True)
