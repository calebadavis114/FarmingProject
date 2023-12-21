from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import Farmer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class Sign_up(APIView):
        def post(self, request):
            farmer = Farmer.objects.create_user(**request.data)
            token = Token.objects.create(user=farmer)
            return Response(
                {"farmer": farmer.username, "token": token.key}, status=HTTP_201_CREATED)

class Log_in(APIView):
        def post(self, request):
            username = request.data.get("username")
            password = request.data.get("password")
            farmer = authenticate(username=username, password=password)
            if farmer:
                token, created = Token.objects.get_or_create(user=farmer)
                return Response({"token": token.key, "farmer": farmer.username})
            else:
                return Response("No farmer matching credentials", status=HTTP_404_NOT_FOUND)

class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT) 
    


class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.user.email, 'username': request.user.username})
