from .models import Animals
from .serializers import AnimalsSerializer 
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
import requests


class All_Animals(APIView):
    def get(self, request):
        # Retrieve all instances from the Animals model
        all_animal_instances = Animals.objects.all()
        api_data_for_all = []

        for animal_instance in all_animal_instances:
            api_data = self.fetch_data_from_api(animal_instance.name)
            api_data_for_all.append(api_data)

        return Response(api_data_for_all)

    def fetch_data_from_api(self, animalname):
        api_url = f'https://api.api-ninjas.com/v1/animals?name={animalname}'
        api_key = 'iORkRp6U8rzM1rsP3lw8Tg==RdFOj4k7xDjaTqoa'
        headers = {'X-Api-Key': api_key}

        try:
            response = requests.get(api_url, headers=headers)
            response.raise_for_status()

            api_data = response.json()
            return api_data

        except requests.exceptions.RequestException as e:
            error_message = f"Error making API request: {str(e)}"
            return {'error': error_message}
        
class An_Animals(APIView):

    def get(self, request, name):
        api_url = 'https://api.api-ninjas.com/v1/animals?name={}'.format(name)
        response = requests.get(api_url, headers={'X-Api-Key': 'iORkRp6U8rzM1rsP3lw8Tg==RdFOj4k7xDjaTqoa'})
        if response.status_code == requests.codes.ok:
            animal = response.json()
            return Response(animal)
        else:
            print("Error:", response.status_code, response.text)
