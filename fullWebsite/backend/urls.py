from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('images', ImageUploadView, basename='images')

urlpatterns = [
    path('api/', include(router.urls)),
]