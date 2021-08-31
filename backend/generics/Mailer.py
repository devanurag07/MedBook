from django.core.mail import BadHeaderError, EmailMessage
from django.http import HttpResponse
from django.template.loader import get_template
from generics.constants import SMS_API_URL, SMS_AUTH_KEY, SMS_SENDER, SMS_OTP_EXPIRY, SMS_URL
from django.conf import settings
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
from pubnub.exceptions import PubNubException

pnconfig = PNConfiguration()
pnconfig.subscribe_key = 'sub-c-b4378d1c-d11e-11e7-bf34-3236001d850a'
pnconfig.publish_key = 'pub-c-b1c54015-77cf-4c17-b3bc-078d06049db5'
pnconfig.ssl = True
pubnub = PubNub(pnconfig)


class Mailer:
    redington_recipients = {
        'user_ids': [],
        'emails': []
    }

    @classmethod
    def send_mail(cls, subject, recipients, template_name, template_data, attachements=None,
                  attachments_full_path=None, data_attachments=list(), cc_to=[]):
        """" Sends email for the provided details """
        '''Attachment is Optional Parameters. Attachements should be dist its contains url and extenstions'''

        from_email = 'otp@adgsc.com'
        html = get_template(template_name)
        html_content = html.render(template_data)
        if recipients and len(recipients) > 0:
            recipients = list(set(recipients))
            if None in recipients:
                recipients.remove(None)

        try:
            con = cls.get_connection()
            mail = EmailMessage(subject, html_content, to=recipients, from_email=from_email, cc=cc_to, connection=con)
            mail.content_subtype = 'html'
            if attachements is not None:
                mail.attach_file(settings.BASE_DIR + '/' + attachements['url'], attachements['extenstions'])
            elif attachments_full_path is not None:
                mail.attach_file(attachments_full_path)

            """ Attaching data as files into email """
            for attachment in data_attachments:
                mail.attach(filename=attachment['filename'],
                            content=attachment['content'].decode('utf-8'),
                            mimetype=attachment['mimetype'])

            mail.send(fail_silently=True)
            con.close()
        except BadHeaderError:
            return HttpResponse('Invalid header found.')
        return HttpResponse(True)

    @classmethod
    def send_sms(cls, message, mobile, otp):
        import requests
        url = SMS_API_URL + '%sauthkey=%s&message=%s&mobiles=%s&sender=%s&otp=%s&otp_expiry=%s' \
              % ('api/sendotp.php?', SMS_AUTH_KEY, message, mobile, SMS_SENDER, otp, SMS_OTP_EXPIRY)
        post_req = requests.post(url)
        return post_req.json()

    @classmethod
    def send_digimiles_sms(cls, message, mobile, otp):
        url = SMS_URL+'&destination=%s&source=MYCAMP&message=%s' %(mobile ,message)
        import requests
        post_req = requests.get(url)
        return post_req.json()

    @classmethod
    def verify_otp(cls, mobile, otp, state_field):
        import requests
        url = SMS_API_URL + '%sauthkey=%s&%s=%s&otp=%s' % (
        'api/verifyRequestOTP.php?', SMS_AUTH_KEY, state_field, mobile, otp)
        post_req = requests.post(url)
        return post_req.json()

    @classmethod
    def send_otp_email(cls, message, email, otp):
        import requests
        url = SMS_API_URL + '%sauthkey=%s&message=%s&email=%s&sender=%s&otp=%s&otp_expiry=%s' \
              % ('api/sendmailotp.php?', SMS_AUTH_KEY, message, email, SMS_SENDER, otp, SMS_OTP_EXPIRY)
        post_req = requests.post(url)
        return post_req.json()

    def resend_sms(cls, mobile, state_field):
        import requests
        url = SMS_API_URL + '%sauthkey=%s&%s=%s&retrytype=%s' \
              % ('api/retryotp.php?', SMS_AUTH_KEY, state_field, mobile, 'text')
        post_req = requests.post(url)
        return post_req.json()

    @classmethod
    def send_notification(self, data):
        channel = 'flipozo_offers'
        message = {
            "pn_apns": {
                "aps": {
                    "alert": "New offers!",
                    "badge": 1,
                    "data": data
                }
            },
            "pn_gcm": {
                "data": data
            },
            "data_for_all": {
                "data": data
            }
        }

        try:
            envelope = pubnub.publish().channel(channel).message(message).sync()
            print("publish timetoken: %d" % envelope.result.timetoken)
        except PubNubException as e:
            print(e)
        return True

    @classmethod
    def get_connection(self):
        from django.core.mail import get_connection
        connection = get_connection(host='mail.adgsc.com', port='26', username='otp@adgsc.com',
                                    password='OTP_ha_2019')
        return connection
