from django.db import models
# from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser
# from main.models.healthlabel import HealthLabel
# from django.apps import apps
# HealthLabel = apps.get_model('main', 'HealthLabel')

class User(AbstractUser):
  image = models.CharField(max_length=500, blank=True, null=True)
  # health_labels = models.ManyToManyField(HealthLabel, related_name='user', blank=True)
  # five_starred_recipes = ArrayField(models.CharField(default=list, max_length=1000, null=True))
  # four_starred_recipes = ArrayField(models.CharField(default=list, max_length=1000, null=True))
  # health_labels = ArrayField(models.CharField(default=list, max_length=1000, null=True))
  # comments = ArrayField(models.CharField(default=list, max_length=1000, null=True))

# health_labels should be a many to many field into HealthLabel (a model which only has the name)
# (like the classes in the example from class)


# denise
# make a rating_table - user(foreign_key), rating(integer), recipe_id(foreign key)


# emma
# make a health_label table - one field "name" - get the health labels from site 
# comments


# IN DISCUSSION
# final_shopping_list is its own table
# it is 1:1

# ingredients_to_buy_for is its own table
# recipe_id and ingredients(array)