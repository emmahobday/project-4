from django.db import models
from django.contrib.postgres.fields import ArrayField

class Rating(models.Model):
    rating_num = models.IntegerField(null=True)
    #when user is deleted, delete the rating 
    user = models.ForeignKey(User, related_name='ratings', on_delete=models.CASCADE)
    #when recipe is delete, delete the rating 
    recipe_id = models.ForeignKey(Recipe, related_name='ratings', )
    def __str__(self):
      return f'{self.rating_num} star rating for recipe{recipe_id}'


