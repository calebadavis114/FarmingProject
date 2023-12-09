from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/user/', include('user_app.urls')),
    path('api/v1/crops/', include('crops_app.urls')),
    path('api/v1/animals/', include('animals_app.urls')),
    path('api/v1/farms/', include('farm_app.urls'))
]
