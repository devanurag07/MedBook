from django.contrib import messages
from django.http import Http404
from django.shortcuts import redirect
from django.utils.translation import ugettext_lazy as _

from rest_framework import status
from rest_framework.response import Response

from functools import wraps


def is_system_key_alive(func):
    # ADD THIS LINE TO YOUR CUSTOM DECORATOR
    @wraps(func)
    def func_wrapper(self, request, *args, **kwargs):
        if self.request.META.get('HTTP_APIKEY') == '' or self.request.META.get('HTTP_APIKEY') == None:
            data = dict()
            data["status"] = "error"
            data["message"] = "API Key token is missing"
            return Response(data, status=405)
        from common.utils import is_api_key_alive as is_api_key_alive
        # Check if the api key is connected
        is_active = is_api_key_alive(self.request)
        if is_active is False:
            data = dict()
            data["status"] = "error"
            data["message"] = "API Key token seems wrong"
            return Response(data, status=405)
        return func(self, request, *args, **kwargs)
    return func_wrapper

