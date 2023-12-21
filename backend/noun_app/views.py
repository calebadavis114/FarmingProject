from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from requests_oauthlib import OAuth1 

class NameImage(APIView):
    def get(self, request, name):
        auth = OAuth1(("5d3ae9d57e714260a44cfd8484ef8580"),("80a70365e06f4c6d9cfbc5eba218fa9b"))
        endpoint = f"https://api.thenounproject.com/v2/icon?query={name}&limit=20&thumbnail_size=84&blacklist=1&next_page=31352E3739393633322C69636F6E2331333534303034"

        response = requests.get(endpoint, auth=auth)
        responseJSON = response.json()
        return Response(responseJSON['icons'])