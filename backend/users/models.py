from django.contrib.auth.models import AbstractUser, Group
from django.db import models
from django.conf import settings
from django.core.validators import validate_comma_separated_integer_list
from simple_history.models import HistoricalRecords


class QMUser(AbstractUser):
    pass

'''
 Super admin,
 c support admin
 fin admin,
 Public,
 Vendor,
 Del. Agent
'''

USER_TYPE_CHOICES = (
    ('A', 'Admin'),
    ('D', 'Doctors'),
    ('C', 'Customer'),
    ('I', 'Driver'),
)


class UserProfile(models.Model):
    user = models.OneToOneField(QMUser, related_name='profile', on_delete=models.CASCADE)
    user_type = models.CharField(max_length=5, choices=USER_TYPE_CHOICES)
    address_line1 = models.CharField(max_length=500, null=True)
    address_line2 = models.CharField(max_length=500, null=True)
    city = models.CharField(max_length=150, null=True)
    state = models.CharField(max_length=150, null=True)
    country = models.CharField(max_length=100, null=True, default='IN')
    pin_code = models.CharField(max_length=100, null=True)
    mobile = models.BigIntegerField(null=True)
    subscription_active_at = models.DateTimeField(null=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='created_by', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    document_verified = models.BooleanField(default=False)
    document_rejected = models.BooleanField(default=False)
    clinic_name = models.CharField(max_length=100, null=True)
    agreement_file = models.FileField(upload_to='customer/agreement/%Y-%m-%d-%H-%M-%S', blank=True, null=True)
    role_id = models.CharField(max_length=100, validators=[validate_comma_separated_integer_list], null=True)
    history = HistoricalRecords()


class Roles(models.Model):
    group = models.OneToOneField(Group, related_name='details', on_delete=models.CASCADE)
    alias = models.CharField(max_length=50)
    accesses = models.TextField(null=True)
    description = models.TextField(null=True)
    created_by = models.ForeignKey(QMUser, to_field='id', null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()


class PasswordResetTokens(models.Model):
    user = models.ForeignKey(QMUser, related_name="+", on_delete=models.CASCADE)
    token = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
