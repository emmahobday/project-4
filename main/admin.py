from django.contrib import admin
from .models import Recipe, HealthLabel, Comment, Rating, Shopping_list, Recipe_to_buy_for, Meal_plan_recipe

# Register your models here.
admin.site.register(Recipe)
admin.site.register(HealthLabel)
admin.site.register(Comment)
admin.site.register(Rating)
admin.site.register(Shopping_list)
admin.site.register(Recipe_to_buy_for)
admin.site.register(Meal_plan_recipe)
