from django.db import models
from django.contrib.postgres.fields import ArrayField

from django.contrib.auth import get_user_model
User = get_user_model()


class Shopping_list(models.Model):
    #do i put primary_key=True for user 
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='shopping_list')

    def __str__(self):
      return f'{self.user}\s shopping list'



