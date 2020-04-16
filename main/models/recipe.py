from django.db import models
from django.contrib.postgres.fields import ArrayField




# Create your models here.

class Recipe(models.Model):
  dish_name = models.CharField(max_length=500, null=True)
  main_protein = models.CharField(max_length=100, null=True)
  image = models.CharField(max_length=5000, null=True)
  source = models.CharField(max_length=500, null=True)
  instructions_url = models.CharField(max_length=500, null=True)
  servings = models.IntegerField(null=True)
  diet_Labels = ArrayField(models.CharField(max_length=50, blank=True, null=True))
  health_Labels = ArrayField(models.CharField(max_length=50, blank=True, null=True))
  ingredients_lines = ArrayField(models.CharField(max_length=50, blank=True, null=True))
  ingredients = ArrayField(models.CharField(max_length=50, blank=True, null=True))
  calories = models.FloatField(null=True)
  fat = models.FloatField(null=True)
  fat_unit = models.CharField(max_length= 100, null=True)
  sat_fat = models.FloatField(null=True)
  sat_fat_unit = models.CharField(max_length= 100, null=True)
  trans_fat = models.FloatField(null=True)
  trans_fat_unit = models.CharField(max_length= 100, null=True)
  carbs = models.FloatField(null=True)
  carbs_unit = models.CharField(max_length= 100, null=True)
  sugars = models.FloatField(null=True)
  sugars_unit = models.CharField(max_length= 100, null=True)
  protein = models.FloatField(null=True)
  protein_unit = models.CharField(max_length= 100, null=True)
  cholesterol = models.FloatField(null=True)
  cholesterol_unit= models.CharField(max_length= 100, null=True)
  sodium = models.FloatField(null=True)
  sodium_unit = models.CharField(max_length= 100, null=True)
  calcium = models.FloatField(null=True)
  calcium_unit = models.CharField(max_length= 100, null=True)

  def __str__(self):
      return self.dish_name



