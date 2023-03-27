from django.db import models
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

# Create your models here.
class Images(models.Model):
    image = models.ImageField(upload_to='images/', default=None)

    # Updating the save function
    def save(self, *args, **kwargs):
        if not self.pk:
            pass
        super().save(*args, **kwargs)

    def __str__(self):
        return self.image.name
