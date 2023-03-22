from django.db import models

# Create your models here.
class Images(models.Model):
    image = models.ImageField(upload_to='images/')


    def process_image(self):
        pass

    def delt(self, *args, **kwargs):
        self.image.delete()
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.image.name