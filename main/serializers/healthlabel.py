from rest_framework import serializers
from main.models.healthlabel import HealthLabel
from django.contrib.auth import get_user_model
User = get_user_model()


# class UserSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = User
#     fields = ('username', 'email', 'password', 'password_confirmation', 'image', 'health_labels', 'comments')
#     # extra_kwargs = {'healthlabels': {'required': False}}

class HealthLabelSerializer(serializers.ModelSerializer):
  class Meta: 
    model = HealthLabel
    fields = ('name')

# class PopulateHealthLabelSerializer(HealthLabelSerializer):
#   user = UserSerializer
    
