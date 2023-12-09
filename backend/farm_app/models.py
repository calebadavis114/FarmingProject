from django.db import models
from crops_app.models import Crops
from user_app.models import Farmer
from animals_app.models import Animals

class Farm(models.Model):
    name = models.CharField(max_length=255)
    user = models.ManyToManyField(Farmer, related_name='user')
    crops = models.ManyToManyField(Crops, related_name='crops')
    animals = models.ManyToManyField(Animals,related_name='animals')

    def __str__(self):
        return f'{self.name} : {self.animals} and {self.crops}'
