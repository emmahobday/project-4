from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from main.models.recipe import Recipe 

#python stuff
from collections import Counter 
import statistics

# class SuggestedRecipesListView(APIView):
  #these are the user's 

class SuggestedRecipesListView(APIView):
  def get(self,request):
    #this gets user's 5 starred recipes
    protein_list = []
    source_list = []
    calorie_per_serving_list = []
    fivestarredrecipes = Recipe.objects.filter(ratings__rating_num=5).filter(ratings__user=request.user)

    for recipe in fivestarredrecipes:
      protein_list.append(recipe.main_protein)
      source_list.append(recipe.source)
      calorie_per_serving_list.append( (recipe.calories/recipe.servings))
      # print(recipe.main_protein)

    #remove protein and source that occur only once 
    def removeElements(lst, k): 
        counted = Counter(lst) 
        return [el for el in lst if counted[el] >= k]
  
    final_protein_list = removeElements(protein_list, 2)
    final_source_list = removeElements(source_list, 2)
    count_protein = Counter(final_protein_list)
    count_source = Counter(final_source_list)
    print(count_source)
    
    for recipe in Recipe.objects.all():
      #if protein occurs twice gets 5 points, thrice gets 10 points etc etc
      protein_score = count_protein[recipe.main_protein] * 5 - 5 if count_protein[recipe.main_protein] != 0 else 0
      source_score = count_source[recipe.source] * 5 - 5 if count_source[recipe.source] !=0 else 0
      # print(protein_score)
      print(source_score)

    #average recipe calorie 
    average_recipe_calorie = statistics.mean(calorie_per_serving_list) 
    #if 2 times, get 5 points, if 3 times, get 10 points etc 




 
    # serializer = PopulatedRatingSerializer(fivestarredrecipes, many=True)
    # return Response(serializer.data)

#dictionary two elements/fields: one is recipe object and one is score for that recipe object 