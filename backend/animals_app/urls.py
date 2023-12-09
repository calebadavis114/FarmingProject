from django.urls import path, register_converter
from .views import An_Animals, All_Animals
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('',All_Animals.as_view(), name='all_animals'),
    path('<int_or_str:name>/', An_Animals.as_view(), name='a_animals')
]