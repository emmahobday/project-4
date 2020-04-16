from rest_framework import serializers

from main.models.recipe import Recipe 

class BasicRecipeSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Recipe 
    fields = ('id','dish_name', 'main_protein', 'image', 'source', 'instructions_url', 'servings', 'diet_Labels', 'health_Labels')


class DetailedRecipeSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Recipe 
    fields = ('id', 'dish_name', 'main_protein', 'image', 'source', 'instructions_url', 'servings', 'diet_Labels', 
    'health_Labels', 'ingredients_lines', 'ingredients', 'calories', 'fat', 'fat_unit', 'sat_fat', 'sat_fat_unit', 
    'trans_fat', 'trans_fat_unit', 'carbs', 'carbs_unit', 'sugars', 'sugars_unit', 'protein', 'protein_unit',
    'cholesterol', 'cholesterol_unit', 'sodium', 'sodium_unit', 'calcium', 'calcium_unit')
