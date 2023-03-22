from django.shortcuts import render
from rest_framework import status, viewsets
from .models import Images
from .serializers import ImagesSerializer

# Create your views here.
class ImageUploadView(viewsets.ModelViewSet):
    queryset = Images.objects.all()
    serializer_class = ImagesSerializer
    print("ajhu")