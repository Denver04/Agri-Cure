from rest_framework import status, viewsets
from django.http import JsonResponse
from .models import Images
from .serializers import ImagesSerializer
from .process_image import process_image
import os

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


        # Process the image with process_image.py
        img_path = instance.image.path
        prediction = process_image(img_path)
        
        # Delete the image file and the database entry
        os.remove(img_path)
        instance.delete()

        # Return the prediction
        response_data = {
            'prediction': prediction,
            'status': status.HTTP_201_CREATED,
        }
        return JsonResponse(response_data)