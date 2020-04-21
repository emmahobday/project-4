
from main.models.recipe import Recipe
from django.db import models

from django.contrib.auth import get_user_model
User = get_user_model()


class Meal_plan_recipe(models.Model):
    # one recipe can have many recipes to buy for (from diff users)
    recipe = models.ForeignKey(
        Recipe, related_name='meal_plan_recipes', on_delete=models.CASCADE, null=True
    )
    date = models.DateField(null=True)

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='meal_plan_recipe')

    def __str__(self):
        return f'meal plan recipe for user {self.user}'
