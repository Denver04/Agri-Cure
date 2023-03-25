from django.db import models

# Create your models here.
class Images(models.Model):
    image = models.ImageField(upload_to='images/', default=None)

    def __str__(self):
        return self.image.name
