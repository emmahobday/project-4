from rest_framework import serializers

from main.models.meal_plan_recipe import Meal_plan_recipe

# used to serialize post data from frontend


class BasicMPRSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal_plan_recipe
        fields = ('date', 'recipe')


# class PopulatedRatingSerializer(serializers.ModelSerializer):
#   #nested serializers here for recipe and user.
#   from main.serializers.recipe import BasicRecipeSerializer
#   recipe = BasicRecipeSerializer()

#   class Meta:
#     model = Rating
#     fields = ('rating_num','recipe', 'user')
