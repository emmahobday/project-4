from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView


from main.models.recipe import Recipe 
from main.serializers.recipe import BasicRecipeSerializer, DetailedRecipeSerializer

from rest_framework.pagination import PageNumberPagination


class AllRecipesPagination(PageNumberPagination): 
    page_size = 40
    page_size_query_param = 'page_size'
    max_page_size = 40

class AllRecipesListView(ListCreateAPIView):
  queryset = Recipe.objects.all()
  serializer_class = BasicRecipeSerializer
  pagination_class = AllRecipesPagination 

  def get(self, request): 
      recipes = self.paginate_queryset(Recipe.objects.all())
      serializer = BasicRecipeSerializer(recipes, many=True)
      return self.get_paginated_response(serializer.data)


class RecipeDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Recipe.objects.all()
  serializer_class = DetailedRecipeSerializer
  