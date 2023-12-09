from .models import Farm
from django.shortcuts import get_object_or_404
from .serializers import FarmSerializer 
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class All_Farms(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        farms = Farm.objects.all()
        farm_serializer = FarmSerializer(farms, many=True)
        return Response(farm_serializer.data)

class A_Farm(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
            farm = None
            if type(id) == int:
                farm = Farm.objects.get(id = id)
            else:
                farm = Farm.objects.get(name = id.title()) 
            return Response(FarmSerializer(farm).data) 
