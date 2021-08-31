from rest_framework import serializers
from payment.models import PaymentDetails


class PaymentSerializer(serializers.ModelSerializer):
    customer_name = serializers.ReadOnlyField(source='created_by.first_name')
    email = serializers.ReadOnlyField(source='created_by.email')
    address = serializers.ReadOnlyField(source='created_by.address_line1')
    mobile = serializers.ReadOnlyField(source='created_by.mobile')

    class Meta:
        model = PaymentDetails
        fields = (
            'id', 'order_id','amount', 'customer_name', 'email', 'mobile', 'address', 'request_notes', 'response_notes',
            'status', 'created_by', 'created_at')
        read_only_fields = ['response_notes', 'status', 'request_notes']
