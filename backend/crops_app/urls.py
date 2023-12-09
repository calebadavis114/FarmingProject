from django.urls import path, register_converter
from .views import All_Crops, A_Crop
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('', All_Crops.as_view(), name='all_crops'),
    path('<int_or_str:id>/', A_Crop.as_view(), name='a_crop')
]
