from django.db import models
from django.conf import settings
from simple_history.models import HistoricalRecords

'''
# Create your models here.
class AboutUs(models.Model):
    description = models.TextField()
    deleted = models.BooleanField(default=False)
    header_image = models.ImageField(upload_to='about_us_images/%Y-%m-%d-%H-%M-%S', blank=True, null=True)
    footer_image = models.ImageField(upload_to='about_us_images/%Y-%m-%d-%H-%M-%S', blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='about_us_created_by',
                                   on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()
    '''


class ApiKeys(models.Model):
    ip = models.CharField(max_length=2555)
    token = models.TextField();
    created_at = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()


class OtpRequests(models.Model):
    phone_number = models.CharField(default=0, max_length= 50)
    otp = models.IntegerField(default=0, null=False)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()


class OTPVerification(models.Model):
    email = models.TextField()
    otp = models.IntegerField(default=0, null=False)
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

