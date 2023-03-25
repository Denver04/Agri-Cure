from django.shortcuts import render
from rest_framework import status, viewsets
from django.http import JsonResponse
from .models import Images
from .serializers import ImagesSerializer
from .process_image import process_image

# Create your views here.
class ImageUploadView(viewsets.ModelViewSet):
    queryset = Images.objects.all()
    serializer_class = ImagesSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Save the image to the database
        image = serializer.validated_data['image']
        instance = serializer.save()
        instance.image = image
        instance.save()

        # Process the image with process_image.py
        img_path = instance.image.path
        prediction = process_image(img_path)
        print(prediction)

        response_data = {
            'prediction': prediction,
            'status': status.HTTP_201_CREATED,
        }
        return JsonResponse(response_data)