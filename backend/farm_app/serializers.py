from rest_framework import serializers
from .models import Farm

class FarmSerializer(serializers.ModelSerializer):
    animals = serializers.SerializerMethodField()
    crops = serializers.SerializerMethodField()

    class Meta:
        model = Farm
        fields = ['id', 'animals', 'crops']

    def get_animals(self, obj):
        animals = obj.animals.all()
        animals = [x.name for x in animals]
        return animals
    
    def get_crops(self, obj):
        crops = obj.crops.all()
        crops = [x.name for x in crops]
        return crops