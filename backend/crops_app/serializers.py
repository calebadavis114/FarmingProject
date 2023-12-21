from rest_framework import serializers
from .models import Crops

class CropsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crops
        fields = ['id', 'name', 'picture', 'plant_season', 'grow_time', 'average_yield', 'description', 'user_notes']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Set 'required' attribute dynamically based on incoming data
        request_data = self.context.get('request_data', {})
        for field in self.fields.keys():
            if field != 'id':  # 'id' should always be required
                self.fields[field].required = field in request_data