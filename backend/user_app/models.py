from django.db import models
from django.contrib.auth.models import AbstractUser

class Farmer(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    username = models.CharField(max_length=255,null=False, blank=False, unique=True)
    name = models.CharField(max_length=255, null=False, blank=False, default='None')

    REQUIRED_FIELDS = ['name'] 