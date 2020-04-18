from rest_framework import serializers

from main.models.rating import Rating 

class BasicRatingSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Rating
    fields = ('rating_num', 'recipe', 'user')


class PopulatedRatingSerializer(serializers.ModelSerializer):
  #nested serializers here for recipe and user. 
  class Meta:
    model = Rating
    fields = ('rating_num','recipe', 'user')
