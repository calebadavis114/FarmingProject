from .models import Crops
from .serializers import CropsSerializer 
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_201_CREATED


class All_Crops(APIView):
        def get(self, request):
            crops = CropsSerializer(Crops.objects.order_by('id'), many=True)
            return Response(crops.data)
        def post(self, request):
            new_crop = CropsSerializer(data=request.data)
            if new_crop.is_valid():
                new_crop.save()
                return Response(new_crop.data, status=HTTP_201_CREATED)
            else:
                return Response(new_crop.errors, status=HTTP_400_BAD_REQUEST)
class A_Crop(APIView):
          def get(self, request, id): 
            crop = None
            if type(id) == int:
                crop = Crops.objects.get(id = id)
            else:
                crop = Crops.objects.get(name = id.title()) 
            return Response(CropsSerializer(crop).data) 

          def put(self, request, id):
                    try:
                        crop = Crops.objects.get(id=id)
                        serialized_crops = CropsSerializer(crop, data=request.data)
                        if serialized_crops.is_valid():
                            serialized_crops.save()
                            return Response(status=HTTP_204_NO_CONTENT)
                        else:
                            return Response(serialized_crops.errors, status=HTTP_400_BAD_REQUEST)
                    except Crops.DoesNotExist:
                        return Response({'error': 'Crop not found'}, status=HTTP_400_BAD_REQUEST)

          def delete(self, request, id):
                try:
                    crop = Crops.objects.get(id=id)
                    crop.delete()
                    return Response(status=HTTP_204_NO_CONTENT)
                except Crops.DoesNotExist:
                    return Response({'error': 'Crop not found'}, status=HTTP_400_BAD_REQUEST)
