from django.db import models

class Crops(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(null=True, blank=True)
    plant_season = models.CharField(max_length=255)
    grow_time = models.IntegerField(null=True)
    average_yield = models.CharField(max_length=255)
    description = models.TextField(null=False, blank=False)
    user_notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'{self.name} | {self.description}'
    

