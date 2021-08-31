import requests
API_KEY = 'we6075JbW2GRqtTNa8MFBj9ESYOLD1HXiKVxPCQZzucmopUghy90sh62wI7YeQjOn4t5HSJUdKEBXWyk'
url = "https://www.fast2sms.com/dev/bulkV2"
MESSAGE_URL = 'https://www.fast2sms.com/dev/bulkV2'
HEADERS = {
    'authorization': API_KEY,
    'Content-Type': "application/x-www-form-urlencoded",
    'Cache-Control': "no-cache",
}


def send_message(to, message):
    payload = "message=%s&language=english&route=q&numbers=%s" % (message, to)

    response = requests.post(MESSAGE_URL, data=payload, headers=HEADERS)
    return response
