from django.urls import path, register_converter
from .views import A_Farm, All_Farms
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('',All_Farms.as_view(), name='all_farms'),
    path('<int_or_str:id>/', A_Farm.as_view(), name='a_farms')
]