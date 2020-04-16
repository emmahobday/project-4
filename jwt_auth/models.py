from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  image = models.CharField(max_length=500)
  five_starred_recipes = ArrayField(models.CharField(max_length=1000, blank=True, null=True))
  four_starred_recipes = ArrayField(models.CharField(max_length=1000, blank=True, null=True))
  health_labels = ArrayField(models.CharField(max_length=1000, blank=True, null=True))
  comments = ArrayField(models.CharField(max_length=1000, blank=True, null=True))