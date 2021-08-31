from queues.models import Queue, Prescription, PrescriptionData
from rest_framework import serializers


class PrescriptionDataSerializer(serializers.ModelSerializer):
    note = serializers.CharField(allow_null=True, allow_blank=True)

    class Meta:
        model = PrescriptionData
        fields = (
            'id', 'name', 'drug_to_taken', 'note',
            'deleted', 'created_by', 'created_at')
        read_only_fields = ['deleted', 'status']


class QueueSerializer(serializers.ModelSerializer):
    customer_name = serializers.ReadOnlyField(source='customer.first_name')
    email = serializers.ReadOnlyField(source='customer.email')
    address = serializers.ReadOnlyField(source='customer.address_line1')
    mobile = serializers.ReadOnlyField(source='customer.profile.mobile')
    note = serializers.CharField(allow_null=True, allow_blank=True)

    class Meta:
        model = Queue
        fields = (
            'id', 'customer', 'customer_name', 'email', 'mobile', 'address', 'note', 'status',
            'deleted', 'created_by', 'created_at')
        read_only_fields = ['deleted', 'status']


class PrescriptionSerializer(serializers.ModelSerializer):
    note = serializers.CharField(allow_null=True, allow_blank=True)
    prescription_name = serializers.ReadOnlyField(source='prescription.name')
    prescription_drug_to_taken = serializers.ReadOnlyField(source='prescription.drug_to_taken')

    class Meta:
        model = Prescription
        fields = (
            'id', 'customer', 'customer_name', 'clinic_name', 'queue', 'mobile', 'prescription',
            'note', 'prescription_name', 'prescription_drug_to_taken', 'deleted', 'created_by',
            'created_at')
        read_only_fields = ['deleted']
