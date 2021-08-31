from rest_framework import routers
from users.views import UsersViewSet, GroupsViewSet
from common.views import OtpRequestViewSet
from queues.views import QueueViewSet, PrescriptionViewSet, PrescriptionDataViewSet
from payment.views import PaymentViewSet
# Defining Router
qm_app_router = routers.DefaultRouter()
# users app related view set url config
qm_app_router.register(r'common', OtpRequestViewSet)
qm_app_router.register(r'users', UsersViewSet)
qm_app_router.register(r'roles', GroupsViewSet, 'group')
qm_app_router.register(r'queue', QueueViewSet, 'queue')
qm_app_router.register(r'prescription-info', PrescriptionDataViewSet, 'prescription-info')
qm_app_router.register(r'prescription', PrescriptionViewSet, 'prescription')
qm_app_router.register(r'payment', PaymentViewSet, 'payment')