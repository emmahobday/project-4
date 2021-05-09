
from rest_framework import serializers

from main.models.recipe_to_buy_for import Recipe_to_buy_for
from main.serializers.recipe import BasicRecipeSerializer


class BasicRecipeToBuyForSerializer(serializers.ModelSerializer):
    recipe = BasicRecipeSerializer()

    class Meta:
        model = Recipe_to_buy_for
        fields = ('recipe', 'shopping_list', 'ingredients_to_buy_for')

# note that this is NOT a model serialzer, but just a DRF Serializer.


class DRFNormalRecipeToBuyForSerializer(serializers.Serializer):
    ingredient = serializers.CharField(max_length=200)
