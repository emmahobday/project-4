from main.models.shopping_list import Shopping_list
from main.models.recipe import Recipe
from django.db import models
from django.contrib.postgres.fields import ArrayField

from django.contrib.auth import get_user_model
User = get_user_model()


class Recipe_to_buy_for(models.Model):
    # one recipe can have many recipes to buy for (from diff users)
    recipe = models.ForeignKey(
        Recipe, related_name='recipes_to_buy_for', on_delete=models.CASCADE, null=True
    )
    shopping_list = models.ForeignKey(
        Shopping_list, related_name='recipe_to_buy_fors', on_delete=models.CASCADE, null=True
    )
    ingredients_to_buy_for = ArrayField(models.CharField(
        default=list, max_length=5000, null=True, blank=True), default=list)

    def __str__(self):
        return f'recipe to buy for, for shopping list {self.shopping_list}'
