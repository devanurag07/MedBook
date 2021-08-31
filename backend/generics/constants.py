DEFAULT_USER_TYPE = 'Users'
CUSTOMERS_USER_TYPE = 'Customers'
Doctors_USER_TYPE = 'Doctors'
branch_statuses = (
    (1, 'Active'),
    (2, 'Suspended')
)
branch_currency = 'INR'

# SMS related Configuration
SMS_API_URL = 'http://api.msg91.com/'
SMS_AUTH_KEY = '247924ACMdP4ReCRe85bf15f8b'
SMS_SENDER = 'NammaCake'
SMS_OTP_EXPIRY = 5
SMS_URL = 'http://sms.digimiles.in/bulksms/bulksms?username=di78-binary&password=rachel&type=0&dlr=1'

# kaleyra message configuration
API_KEY = 'A693774e659d5fa82b5d029d97e64a4da'
HEADERS = {'api-key': API_KEY, 'Content-Type': 'application/x-www-form-urlencoded'}
MESSAGE_URL = 'https://api.kaleyra.io/v1/HXIN1698072219IN/messages'
SENDER_ID = 'MYMEDB'
TEMPLATE_ID = '987654321012'
