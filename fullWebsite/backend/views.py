from rest_framework import status, viewsets
from django.http import JsonResponse
from .models import Images
import numpy as np
from .serializers import ImagesSerializer
from .process_image import process_image
import os

# Create your views here.
class ImageUploadView(viewsets.ModelViewSet):
    queryset = Images.objects.all()
    serializer_class = ImagesSerializer

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            # Save the image to the database
            image = serializer.validated_data['image']
            instance = serializer.save()


            # Process the image with process_image.py
            img_path = instance.image.path
            print('image path recieved and sent to process_image')
            print(img_path)
            
            prediction = process_image(img_path)
            
            # Delete the image file and the database entry
            os.remove(img_path)
            instance.delete()

            # Return the prediction
            response_data = {
                'prediction': prediction,
                'status': status.HTTP_201_CREATED,
            }
            print('prediction : ', response_data)
            return JsonResponse(response_data)
        except:
            prediction = ("Server Error, cannot process provided image", np.random.randint(1, 1000000))
            response_data = {
                'prediction': prediction,
                'status': status.HTTP_406_NOT_ACCEPTABLE,
            }          
            print('Server error, cannot process provided image')
            return JsonResponse(response_data)