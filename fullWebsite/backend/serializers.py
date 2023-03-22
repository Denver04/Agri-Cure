from rest_framework.serializers import ModelSerializer
from .models import Images


class ImagesSerializer(ModelSerializer):
    class Meta:
        model = Images
        fields = '__all__'