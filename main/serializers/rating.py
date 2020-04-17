from rest_framework import serializers

from main.models.recipe import Rating 

class BasicRatingSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Recipe 
    fields = ('rating_num', 'recipe', 'user')


class PopulatedRatingSerializer(serializers.ModelSerializer):
  #nested serializers here for recipe and user. 
  class Meta:
    model = Recipe
    fields = ('rating,num','recipe', 'user')
