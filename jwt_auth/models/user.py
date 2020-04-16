from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  image = models.CharField(max_length=500)
  five_starred_recipes = models.ArrayField(null=True)
  four_starred_recipes = models.ArrayField(null=True)
  health_labels = models.ArrayField(null=True)
  comments = models.ArrayField(null=True)