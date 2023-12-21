from rest_framework import serializers
from .models import Farm

class FarmSerializer(serializers.ModelSerializer):
    animals = serializers.SerializerMethodField()
    crops = serializers.SerializerMethodField()

    class Meta:
        model = Farm
        fields = ['id','user', 'animals', 'crops']


    def get_animals(self, obj):
        return [animal.name for animal in obj.animals.all()]

    def get_crops(self, obj):
        return [crop.name for crop in obj.crops.all()]