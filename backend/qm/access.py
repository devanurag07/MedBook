import os

JWT_SECRET_KEY = '-t0+*(&dw*@k^1vatz6c6#i+31y+p6z5dpam4c+l4f*6cyrc8h'
JWT_EXP_DAY = 1
API_KEY_EXP_DAY = 10
HASH_ALG = 'HS256'
DB_CONFIG = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'qmapp',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'USER': 'root',
        'PASSWORD': 'anurag18',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'charset': 'utf8mb4',
        }
    }
}


# DB_CONFIG = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join('./', 'db.sqlite3'),
#         'OPTIONS': {
#             'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
#             'charset': 'utf8mb4',
#         }
#     }
# }
PAYMENT_API_KEY = 'rzp_test_ztkFQhmCLT9v2A'
PAYMENT_API_SECRET = 'AGJRDLXLFjtdW9kik0oP9UPD'
PLAN_1 = 39900
PLAN_2 = 35900
PLAN_3 = 33900
PAYMENT_CURRENCY = 'INR'
