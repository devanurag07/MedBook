import requests
from generics.constants import HEADERS, MESSAGE_URL, SENDER_ID, TEMPLATE_ID


def send_message(to, message):
    receiver = '+91' + to
    response = requests.post(MESSAGE_URL,
                             data={
                                 'to': receiver,
                                 'body': message,
                                 'sender': SENDER_ID
                             },
                             headers=HEADERS)
    return response


def send_prescription(to, message):
    receiver = '+91' + to
    response = requests.post(MESSAGE_URL,
                             data={
                                 'to': receiver,
                                 'template_id': TEMPLATE_ID,
                                 'body': message,
                                 'sender': SENDER_ID
                             },
                             headers=HEADERS)
    return response

# curl -X POST "https://api.kaleyra.io/v1/HXIN1698072219IN/messages"  -H "api-key: A693774e659d5fa82b5d029d97e64a4da" -H "Content-Type: application/x-www-form-urlencoded" -d "to=+918778393123" -d "sender=MYMEDB" -d "body=Hello! This is my first SMS."
# template Id 987654321012
