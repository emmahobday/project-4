from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT, HTTP_200_OK
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView

from main.models.recipe_to_buy_for import Recipe_to_buy_for
from main.models.recipe import Recipe
from main.serializers.recipe_to_buy_for import BasicRecipeToBuyForSerializer, DRFNormalRecipeToBuyForSerializer


class RecipeToBuyForListView(APIView):
    # gets all the recipes to buy for (will show all users' recipeS to buy for )
    def get(self, request):
        recipes_to_buy_for = Recipe_to_buy_for.objects.all()
        # not sure if plural can just be recipeS_to_buy_for
        serializer = BasicRecipeToBuyForSerializer(
            recipe_to_buy_fors, many=True)
        return Response(serializer.data)

    # for the first time
    def post(self, request):
      # must put , because it returns a tuple, the 2nd argument would be true or false
        recipe = Recipe.objects.get(id=request.data['recipe_id'])
        recipe_to_buy_for, _ = Recipe_to_buy_for.objects.get_or_create(
            # the model recipe_to_buy_for has a field "shopping_list", so I need to tell it which shopping_list it is connected to
            shopping_list=request.user.shopping_list,
            recipe=recipe
            # NOT SURE IF THIS IS HOW YOU ACCESS FIELDS FROM THE REQUEST:
            # recipe = request.data.recipe_id
        )
        # serializer = DRFNormalRecipeToBuyForSerializer(request.data.ingredient)
        serializer = DRFNormalRecipeToBuyForSerializer(
            data=request.data)
        if serializer.is_valid(raise_exception=True):
            # not sure if ['ingredient'] or request.post.get('ingredient)
            # print('here line 37', recipe_to_buy_for.__dict__)
            ingredient_field = recipe_to_buy_for.ingredients_to_buy_for
            # print('here, line 39', ingredient_field)
            ingredient_field.append(
                serializer.validated_data['ingredient']
                # next(iter(serializer.validated_data.values()))
            )
            recipe_to_buy_for.save()
            # print('here line 42', serializer.validated_data['ingredient'])
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

    # this deletes the entire recipe to buy for (i.e removes all the ingredients for that recipe to buy for, for that user)
    def delete(self, request):
        recipe = Recipe.objects.get(id=request.data['recipe_id'])

        recipe_to_buy_for = Recipe_to_buy_for.objects.get(
            shopping_list=request.user.shopping_list,
            recipe=recipe
        )

        recipe_to_buy_for.delete()
        return Response(status=HTTP_204_NO_CONTENT)
