from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.views import ObtainJSONWebToken, APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework import permissions

jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


class ObtainJSONWebTokenExtended(ObtainJSONWebToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')

            data = serializer.initial_data
            response_data = jwt_response_payload_handler(token, user, request)

            return Response(response_data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class APILogout(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            user = request.user
            data = request.data


            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

obtain_jwt_token_extended = ObtainJSONWebTokenExtended.as_view()
logout_api = APILogout.as_view()