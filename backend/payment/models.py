from django.db import models
from users.models import QMUser
from simple_history.models import HistoricalRecords
from jsonfield import JSONField


# Create your models here.
class PaymentDetails(models.Model):
    order_id = models.CharField(max_length=500, null=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    request_notes = JSONField(default=None, null=True)
    response_notes = JSONField(default=None, null=True)
    status = models.IntegerField(default=0)
    deleted = models.BooleanField(default=False)
    created_by = models.ForeignKey(QMUser, related_name='payment_created_by',
                                   on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()
