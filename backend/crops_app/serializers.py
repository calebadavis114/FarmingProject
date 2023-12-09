from rest_framework import serializers
from .models import Crops

class CropsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Crops
        fields = ['id', 'name', 'image', 'description', 'plant_season', 'grow_time', 'average_yield']