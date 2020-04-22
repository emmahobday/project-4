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

        # queryset = Rating.objects.all()
        # serializer_class = BasicRatingSerializer(data)

        # def post(self, request):
        #     # get the user posting
        #     user = request.user
        #     # Turn the json into data we can store in psql.

        #     # this passes the data to the serializer (request.data will have rating_num and recipe )
        #     serializer = BasicRatingSerializer(data=request.data)
        #     # I'll have validation on the frontend. as in user can only rate using the stars
        #     if serializer.is_valid(raise_exception=True):
        #         # this creates the object in the ratings table
        #         serializer.save(user=user)
        #         return Response(serializer.data, status=HTTP_201_CREATED)
        # #     return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

        # class UsersRatingListView(APIView):
        #     def get(self, request):
        #         ratings = Rating.objects.filter(
        #             user=request.user, rating_num=5)
        #         serializer = PopulatedRatingSerializer(ratings, many=True)
        #         return Response(serializer.data)
