from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from .recipe import Recipe

class Comment(models.Model):
  user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE, blank=True)
  recipe_id = models.ForeignKey(Recipe, related_name='comments', on_delete=models.CASCADE, blank=True)
  comment = models.CharField(max_length=200)
  
  def __str__(self):
      return self.name