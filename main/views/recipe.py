from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView


from main.models.recipe import Recipe 
from main.serializers.recipe import BasicRecipeSerializer

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

# this returns recipes that have main_protein that matches the search filter taken from the URL of the GET request
class FilteredRecipeView(ListCreateAPIView):
  serializer_class = BasicRecipeSerializer
  pagination_class = AllRecipesPagination 

  def get(self, request, filter): 
      recipes = self.paginate_queryset(Recipe.objects.filter(main_protein__iexact=filter))
      serializer = BasicRecipeSerializer(recipes, many=True)
      return self.get_paginated_response(serializer.data)


# this takes up to 3 search terms from the URL of the GET request (named query) and returns recipes that include these search terms in the ingredients list
class FridgeRecipeView(ListCreateAPIView):
  # queryset = Recipe.objects.filter(ingredients_lines__icontains='')
  serializer_class = BasicRecipeSerializer
  pagination_class = AllRecipesPagination 

  def get(self, request, query): 
      if query.count('&') == 2:
        query1 = query.split('&')[0]
        query2 = query.split('&')[1]
        query3 = query.split('&')[2]
      elif query.count('&') == 1:
        query1 = query.split('&')[0]
        query2 = query.split('&')[1]
        query3 = ''
      else:
        query1 = query
        query2 = ''
        query3 = ''

      recipes = self.paginate_queryset(Recipe.objects.filter(
        ingredients_lines__icontains=query1
        ).filter(
          ingredients_lines__icontains=query2
        ).filter(
          ingredients_lines__icontains=query3
        ))
      serializer = BasicRecipeSerializer(recipes, many=True)
      return self.get_paginated_response(serializer.data)
    

  