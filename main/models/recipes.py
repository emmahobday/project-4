from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.

class Recipe(models.Model):
  dish_name = models.CharField(max_length=500 null=True)
  main_protein = models.CharField(max_length=100 null=True)
  image = models.CharField(max_length=5000 null=True)
  source = models.CharField(max_length=500 null=True)
  instructions_url = models.CharField(max_length=500 null=True)
  servings = models.IntegerField(null=True)
  diet_labels = models.ArrayField(null=True)
  health_labels = models.ArrayField(null=True)
  ingredients_lines = models.ArrayField(null=True)
  ingredients = models.ArrayField(null=True)
  calories = models.IntegerField(null=True)
  fat = models.IntegerField(null=True)
  sat_fat = models.IntegerField(null=True)
  trans_fat = models.IntegerField(null=True)
  carbs = models.IntegerField(null=True)
  sugars = models.IntegerField(null=True)
  protein = models.IntegerField(null=True)
  cholesterol = models.IntegerField(null=True)
  sodium = models.IntegerField(null=True)
  calcium = models.IntegerField(null=True)
  comments = models.ArrayField(null=True)
  def __str__(self):
      return self.dish_name



