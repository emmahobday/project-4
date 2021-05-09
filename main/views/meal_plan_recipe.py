from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView

from main.models.meal_plan_recipe import Meal_plan_recipe
from main.serializers.meal_plan_recipe import BasicMPRSerializer, PopulatedMPRSerializer
# from main.serializers.rating import BasicRatingSerializer, PopulatedRatingSerializer
# from main.serializers.recipe import BasicRecipeSerializer

# from main.models.recipe import Recipe


class UserMealPlanRecipeListView(APIView):
    def get(self, request):
        mprecipes = Meal_plan_recipe.objects.filter(user=request.user)
        serializer = PopulatedMPRSerializer(mprecipes, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        serializer = BasicMPRSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request):
        user = request.user
        serializer = BasicMPRSerializer
        mprecipe = Meal_plan_recipe.objects.get(
            user=request.user,
            recipe=request.recipe)
        mprecipe.delete()
        return Response(status=HTTP_204_NO_CONTENT)


# Notes
# # this deletes the entire recipe to buy for (i.e removes all the ingredients for that recipe to buy for, for that user)

#     def delete(self, request, pk):
#         recipe = Recipe.objects.get(id=pk)
#         recipe_to_buy_for = Recipe_to_buy_for.objects.get(
#             shopping_list=request.user.shopping_list,
#             recipe=recipe
#         )

#         recipe_to_buy_for.delete()
#         return Response(status=HTTP_204_NO_CONTENT)
