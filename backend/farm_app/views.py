from .models import Farm
from django.shortcuts import get_object_or_404
from .serializers import FarmSerializer
from animals_app.models import Animals
from animals_app.serializers import AnimalsSerializer
from crops_app.models import Crops
from crops_app.serializers import CropsSerializer
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_201_CREATED

class All_Farms(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        farms = Farm.objects.all()
        farm_serializer = FarmSerializer(farms, many=True)
        return Response(farm_serializer.data)

    def post(self, request):
        farm_serializer = FarmSerializer(data=request.data)
        if farm_serializer.is_valid():
            farm_serializer.save()
            return Response(farm_serializer.data, status=HTTP_201_CREATED)
        return Response(farm_serializer.errors, status=HTTP_400_BAD_REQUEST)
    

class A_Farm(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_farm(self, farm_id):
        try:
            return Farm.objects.get(id=farm_id)
        except Farm.DoesNotExist:
            return None

    def get(self, request, id):
        farm = None
        try:
            if type(id) == int:
                farm = Farm.objects.get(id=id)
            else:
                farm = Farm.objects.get(name=id.title())
            serializer = FarmSerializer(farm)
            return Response(serializer.data)
        except Farm.DoesNotExist:
            raise ("Farm not found")


    def post(self, request, id):
                farm_data = request.data
                crop_id = farm_data.get('crop', {}).get('id')
                animal_id = farm_data.get('animal', {}).get('id')

                if crop_id:

                    try:
                        farm = Farm.objects.get(id=id)
                    except Farm.DoesNotExist:
                        return Response({"error": "Farm not found"}, status=HTTP_400_BAD_REQUEST)

                    # Associate existing crop with the farm
                    try:
                        crop = Crops.objects.get(id=crop_id)
                        farm.crops.add(crop)
                        return Response({"message": "Crop added to the farm successfully"}, status=HTTP_201_CREATED)
                    except Crops.DoesNotExist:
                        return Response({"error": "Crop not found"}, status=HTTP_400_BAD_REQUEST)

                elif animal_id:

                    try:
                        farm = Farm.objects.get(id=id)
                    except Farm.DoesNotExist:
                        return Response({"error": "Farm not found"}, status=HTTP_400_BAD_REQUEST)

                    # Associate existing animal with the farm
                    try:
                        animal = Animals.objects.get(id=animal_id)
                        farm.animals.add(animal)
                        return Response({"message": "Animal added to the farm successfully"}, status=HTTP_201_CREATED)
                    except Animals.DoesNotExist:
                        return Response({"error": "Animal not found"}, status=HTTP_400_BAD_REQUEST)

        
class DeleteCropFromFarm(APIView):
    def delete(self, request, farm_id, crop_id):
        farm = get_object_or_404(Farm, id=farm_id)
        crop = get_object_or_404(Crops, id=crop_id)
        farm.crops.remove(crop)

        return Response({"message": "Crop deleted from the farm successfully"}, status=HTTP_204_NO_CONTENT)

class DeleteAnimalFromFarm(APIView):
    def delete(self, request, farm_id, animal_name):
        farm = get_object_or_404(Farm, id=farm_id)

        # Retrieve the animal by name
        try:
            animal = Animals.objects.get(name=animal_name)
        except Animals.DoesNotExist:
            return Response({"error": "Animal not found"}, status=HTTP_400_BAD_REQUEST)

        # Remove the animal from the farm
        farm.animals.remove(animal)

        return Response({"message": "Animal deleted from the farm successfully"}, status=HTTP_204_NO_CONTENT)

