from .models import Crops
from .serializers import CropsSerializer 
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response

class All_Crops(APIView):
        def get(self, request):
            crops = CropsSerializer(Crops.objects.order_by('id'), many=True)
            return Response(crops.data)
        
class A_Crop(APIView):
          def get(self, request, id): 
            crop = None
            if type(id) == int:
                crop = Crops.objects.get(id = id)
            else:
                crop = Crops.objects.get(name = id.title()) 
            return Response(CropsSerializer(crop).data) 
