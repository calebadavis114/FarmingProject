from django.urls import path, register_converter
from .views import A_Farm, All_Farms, DeleteCropFromFarm, DeleteAnimalFromFarm
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('',All_Farms.as_view(), name='all_farms'),
    path('<int:id>/', A_Farm.as_view(), name='a_farms'),
    path('<int:farm_id>/remove_crop/<int:crop_id>/', DeleteCropFromFarm.as_view(), name='remove_from_farm'),
    path('<int:farm_id>/remove_animal/<str:animal_name>/', DeleteAnimalFromFarm.as_view(), name='remove_from_farm'),
]