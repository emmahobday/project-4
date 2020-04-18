from rest_framework import serializers

from main.models.recipe import Recipe 

class BasicRecipeSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Recipe 
    fields = ('id','dish_name', 'main_protein', 'image', 'source', 'instructions_url', 'servings', 'ingredients_lines', 'diet_Labels', 'health_Labels')


class DetailedRecipeSerializer(serializers.ModelSerializer):
  rating = serializers.SerializerMethodField()

  class Meta: 
    model = Recipe 
    fields = ('id', 'dish_name', 'main_protein', 'image', 'source', 'instructions_url', 'servings', 'diet_Labels', 
    'health_Labels', 'ingredients_lines', 'ingredients', 'calories', 'fat', 'fat_unit', 'sat_fat', 'sat_fat_unit', 
    'trans_fat', 'trans_fat_unit', 'carbs', 'carbs_unit', 'sugars', 'sugars_unit', 'protein', 'protein_unit',
    'cholesterol', 'cholesterol_unit', 'sodium', 'sodium_unit', 'calcium', 'calcium_unit', 'rating')

  def get_rating(self, obj):
    user = self.context["request"].user
    print(user.is_authenticated)
    if user.is_authenticated: # check if user is logged in
      user_rating = obj.ratings.filter(user=user).first()
      print(user_rating)
      if user_rating: #if user logged in but never rated, rating field will be null
        return user_rating.rating_num
    return None #if user isn't logged in rating field will be null