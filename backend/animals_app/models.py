from django.db import models

class Animals(models.Model):
    name = models.CharField(max_length=255)