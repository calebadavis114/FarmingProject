from django.urls import path, register_converter
from .views import NameImage
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('<int_or_str:name>/', NameImage.as_view(), name="noun_project"),
]