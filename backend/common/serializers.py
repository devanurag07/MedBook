from rest_framework import serializers
from common.models import OtpRequests
import random
from generics.Mailer import Mailer
'''
from common.models import AboutUs


class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = ('id', 'description', 'deleted', 'header_image', 'footer_image',
                  'created_by', 'created_at')
        read_only_fields = ['created_at', 'deleted']

'''

class OtpRequestSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = OtpRequests

        fields = ('id', 'phone_number', 'otp', 'status', 'created_at')
        read_only_fields = ['created_at']

    def create(self, validated_data):
        validated_data['otp'] = random.randrange(1, 10**4)
        instance = super(OtpRequestSerializer, self).create(validated_data=validated_data)
        message = 'Your Verification code is %s. valid 5 minutes only' % (instance.otp)
        sms_return = Mailer.send_sms(message, instance.phone_number, instance.otp)
        if sms_return['type'] == 'success':
            return instance
        else:
            return sms_return