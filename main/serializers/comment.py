from rest_framework import serializers
from main.models.comment import Comment

class CommentSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Comment 
    fields = ('user', 'recipe_id', 'comment')
