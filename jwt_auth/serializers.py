from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
import django.contrib.auth.password_validation as validations
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    # health_labels = HealthLabelSerializer(many=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError(
                {'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    # def validate_image(self, value):
    #       if not value.startswith('http'):
    #           raise serializers.ValidationError({'image': 'Image field must begin `http`'})

    #       return value

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password',
                  'password_confirmation', 'image')
        # extra_kwargs = {'health_labels': {'required': False}}


class PopulateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'image', 'health_labels', 'comments',)
        # fields = '__all__'
