import jwt
from qm.access import *
import datetime


def is_api_key_alive(request):
    api_key = request.META.get('HTTP_API_KEY', None)
    if not api_key:
        return None
    try:
        jwt.decode(api_key, JWT_SECRET_KEY,
                   leeway=datetime.timedelta(days=API_KEY_EXP_DAY),
                   algorithms=[HASH_ALG])
        return True
    except jwt.ExpiredSignatureError:
        return None


def generate_api_key(request):
    ip = get_client_ip(request)
    token = jwt.encode({'ip': ip, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=API_KEY_EXP_DAY)},
                       JWT_SECRET_KEY, algorithm=HASH_ALG)
    return ip, token


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
