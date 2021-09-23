from django.db import models
from users.models import QMUser
from simple_history.models import HistoricalRecords


class PrescriptionData(models.Model):
    name = models.CharField(max_length=500, null=False)
    drug_to_taken = models.CharField(max_length=500, null=False)
    note = models.TextField()
    deleted = models.BooleanField(default=False)
    created_by = models.ForeignKey(QMUser, related_name='prescription_data_created_by',
                                   on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()


# Create your models here.
class Queue(models.Model):
    customer = models.ForeignKey(
        QMUser, related_name='customer_details', on_delete=models.CASCADE)
    note = models.TextField()
    status = models.IntegerField(default=0)
    deleted = models.BooleanField(default=False)
    created_by = models.ForeignKey(QMUser, related_name='queue_created_by',
                                   on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()


class Prescription(models.Model):
    customer_name = models.CharField(max_length=500, null=False)
    customer = models.ForeignKey(
        QMUser, related_name='prescription_customer_details', on_delete=models.CASCADE, null=True)
    clinic_name = models.CharField(max_length=500, null=False)
    mobile = models.BigIntegerField(null=False)
    prescription = models.ManyToManyField(PrescriptionData, related_name='prescription_queue_data',
                                          )
    note = models.TextField()
    deleted = models.BooleanField(default=False)
    queue = models.ForeignKey(Queue, related_name='prescription_queue',
                              on_delete=models.CASCADE)
    created_by = models.ForeignKey(QMUser, related_name='prescription_created_by',
                                   on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()
