from django.shortcuts import render
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from payment.models import PaymentDetails
from payment.serializers import PaymentSerializer
from users.serializers import UsersSerializer
import razorpay
import simplejson as json


# Create your views here.
class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = PaymentDetails.objects.all()

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            query_set = self.queryset
        else:
            query_set = self.queryset.filter(created_by=user)
        return query_set

    def list(self, request, *args, **kwargs):
        query_params = request.query_params.dict()
        offset = int(query_params.pop('offset', 0))
        end = int(query_params.pop('limit', 100))
        queryset = self.get_queryset()
        order_by = query_params.pop('order_by', None)
        status = query_params.pop('status', None)
        query_set = queryset
        if status is not None:
            query_set = query_set.filter(status=int(status))
        if order_by is not None:
            query_set = query_set.order_by(order_by)
        total_records = query_set.count()
        query_set = query_set[offset:end]
        serializer = self.serializer_class(query_set, many=True, context={'request': request})
        return Response({'records': serializer.data, 'totalRecords': total_records})

    @action(methods=['post'], detail=False, url_path='payment-order')
    def create_payment_order(self, request, **kwargs):
        from qm.access import PAYMENT_API_KEY, PAYMENT_API_SECRET, PLAN_1, PLAN_2, PLAN_3, PAYMENT_CURRENCY
        from datetime import datetime
        user = request.user
        amount = request.data['amount']
        PAYMENT_AMOUNT = amount * 100
        client = razorpay.Client(auth=(PAYMENT_API_KEY, PAYMENT_API_SECRET))
        order_receipt = datetime.now().strftime('%Y%m-%d%H-%M%S-') + str(user.id)
        notes = {'Shipping address': user.profile.address_line1}  # OPTIONAL
        payment_res = client.order.create(data={'amount': PAYMENT_AMOUNT,
                                                "currency": PAYMENT_CURRENCY,
                                                'receipt': order_receipt})
        payment_in = PaymentDetails()
        payment_in.amount = amount
        payment_in.order_id = payment_res['id']
        payment_in.request_notes = json.dumps(payment_res)
        payment_in.created_by = request.user
        payment_in.save()
        return Response(payment_res)

    @action(methods=['post'], detail=False, url_path='payment-success')
    def payment_success(self, request, **kwargs):
        user = request.user
        user_profile = user.profile
        from qm.access import PAYMENT_API_KEY, PAYMENT_API_SECRET
        client = razorpay.Client(auth=(PAYMENT_API_KEY, PAYMENT_API_SECRET))
        form_data = request.data
        import hmac
        import hashlib
        body = "{}|{}".format(form_data['razorpay_order_id'], form_data['razorpay_payment_id'])
        dig = hmac.new(key=bytes(PAYMENT_API_SECRET, 'utf-8'),
                       msg=bytes(body, 'utf-8'),
                       digestmod=hashlib.sha256)

        generated_signature = dig.hexdigest()
        result = hmac.compare_digest(generated_signature, form_data['razorpay_signature'])
        payment_object = PaymentDetails.objects.get(order_id=form_data['razorpay_order_id'])
        payment_object.response_notes = json.dumps(form_data)
        amount = payment_object.amount
        if not result:
            payment_object.status = 2
            payment_object.save()
            return Response({'error': 'Something went wrong'}, status=400)
        import datetime
        payment_object.status = 1
        payment_object.save()
        number_of_month = 1
        if amount == 2994:
            number_of_month = 4
        elif amount == 5388:
            number_of_month = 12
        elif amount == 9576:
            number_of_month = 24
        user_profile.subscription_active_at = datetime.datetime.now() + datetime.timedelta(days=(number_of_month * 30))
        user_profile.amount = amount
        user_profile.save()
        user_details = UsersSerializer(user, context={'request': request}).data
        return Response(user_details)
