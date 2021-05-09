from django.db import models
from django.contrib.postgres.fields import ArrayField

from django.contrib.auth import get_user_model
User = get_user_model()

from .recipe import Recipe 

class Rating(models.Model):
    rating_num = models.IntegerField(null=True)
    #when user is deleted, delete the rating 
    user = models.ForeignKey(User, related_name='ratings', on_delete=models.CASCADE, blank=True, null=True)
    #when recipe is delete, delete the rating 
    recipe = models.ForeignKey(Recipe, related_name='ratings', on_delete=models.CASCADE, blank=True, null=True)
    def __str__(self):
      return f'{self.rating_num} star rating for recipe {self.recipe}'


