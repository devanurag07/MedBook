from rest_framework.views import exception_handler
from rest_framework.response import Response
from django.utils import six
from django.utils.translation import ugettext_lazy as _
from rest_framework.exceptions import APIException, _get_error_details
import logging


class ResellerValidationErr(APIException):
    status_code = 400
    default_detail = _('Invalid input.')
    default_code = 'invalid'

    def __init__(self, detail, code=None):
        if detail is None:
            detail = self.default_detail
        if code is None:
            code = self.default_code

        # For validation failures, we may collect may errors together, so the
        # details should always be coerced to a list if not already.
        if not isinstance(detail, dict) and not isinstance(detail, list):
            detail = [detail]

        self.detail = _get_error_details(detail, code)

    def __str__(self):
        return six.text_type(self.detail)


def erp_exception_handler(exc, context):
    response = exception_handler(exc, context)

    """ Skipping Custom Validation Errors """
    if isinstance(exc, ResellerValidationErr):
        data = {
            'status_code': response.status_code,
            'status_text': response.status_text,
            'detail': None
        }
        if isinstance(exc.detail, list):
            data['detail'] = ', '.join(exc.detail)
        else:
            data['detail'] = exc.detail
        response.data = data
        return response

    requested_url = context['request'].get_full_path()
    requested_user = context['request'].user.username
    # Now add the HTTP status code to the response.
    import uuid
    uuid = uuid.uuid4()
    #print(exc)
    #file = open('/tmp/flipozo_errors.log', 'w')
    #file.write("----- Start %s \n" %(uuid,))
    #file.write("Requested URL: %s \n" %(requested_url,))
    #file.write("Requested User: %s \n" % (requested_user,))
    logger = logging.getLogger(__name__)
    logger.error('----- Start %s' %(uuid,))
    logger.error(_get_traceback(exc))
    logger.error("----- End %s \n" %(uuid,))
    #file.write(_get_traceback(exc))
    #file.write("----- End %s \n" %(uuid,))
    #file.close()

    message = "There was an error processing this request. The administrator has been informed. Error ID: %s" %(uuid,)
    if response is not None:
        response.data['detail'] = message
    elif response is None:
        data={'detail': message}

        return Response(data,status=500)
    return response


def _get_traceback(self, exc_info=None):
    """Helper function to return the traceback as a string"""
    import traceback
    import sys
    return '\n'.join(traceback.format_exception(*(exc_info or sys.exc_info())))
