from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from main.models.recipe import Recipe 
from main.serializers.recipe import BasicRecipeSerializer, DetailedRecipeSerializer

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
    four_starred_protein_list = []
    four_starred_source_list = [] 
    four_starred_calorie_per_serving_list = []
    two_starred_protein_list = []
    two_starred_source_list = [] 
    two_starred_calorie_per_serving_list = []
    one_starred_protein_list = []
    one_starred_source_list = [] 
    one_starred_calorie_per_serving_list = []
    fivestarredrecipes = Recipe.objects.filter(ratings__rating_num=5).filter(ratings__user=request.user)
    fourstarredrecipes = Recipe.objects.filter(ratings__rating_num=4).filter(ratings__user=request.user)
    twostarredrecipes = Recipe.objects.filter(ratings__rating_num=2).filter(ratings__user=request.user)
    onestarredrecipes = Recipe.objects.filter(ratings__rating_num=1).filter(ratings__user=request.user)


    for recipe in fivestarredrecipes:
      protein_list.append(recipe.main_protein)
      source_list.append(recipe.source)
      calorie_per_serving_list.append( (recipe.calories/recipe.servings))
      # print(recipe.main_protein)

    for recipe in fourstarredrecipes:
      four_starred_protein_list.append(recipe.main_protein)
      four_starred_source_list.append(recipe.source)
      four_starred_calorie_per_serving_list.append( (recipe.calories/recipe.servings))

    for recipe in twostarredrecipes:
      two_starred_protein_list.append(recipe.main_protein)
      two_starred_source_list.append(recipe.source)
      two_starred_calorie_per_serving_list.append( (recipe.calories/recipe.servings))

    
    for recipe in onestarredrecipes:
      one_starred_protein_list.append(recipe.main_protein)
      one_starred_source_list.append(recipe.source)
      one_starred_calorie_per_serving_list.append( (recipe.calories/recipe.servings))



    #remove protein and source that occur only once 
    def removeElements(lst, k): 
        counted = Counter(lst) 
        return [el for el in lst if counted[el] >= k]
  
    final_protein_list = removeElements(protein_list, 2)
    final_source_list = removeElements(source_list, 2)

    count_protein = Counter(final_protein_list)
    count_source = Counter(final_source_list)


    four_starred_final_protein_list = removeElements(four_starred_protein_list, 2)
    four_starred_final_source_list = removeElements(four_starred_source_list, 2)
    count_four_starred_protein = Counter(four_starred_final_protein_list)
    count_four_starred_source = Counter(four_starred_final_source_list)


    two_starred_final_protein_list = removeElements(two_starred_protein_list, 2)
    two_starred_final_source_list = removeElements(two_starred_source_list, 2)
    count_two_starred_protein = Counter(two_starred_final_protein_list)
    count_two_starred_source = Counter(two_starred_final_source_list)

    one_starred_final_protein_list = removeElements(one_starred_protein_list, 2)
    one_starred_final_source_list = removeElements(one_starred_source_list, 2)
    count_one_starred_protein = Counter(one_starred_final_protein_list)
    count_one_starred_source = Counter(one_starred_final_source_list)


    recipe_list_with_scores = []
    

    for recipe in Recipe.objects.exclude(ratings__user=request.user):
    # for recipe in Recipe.objects.all():
      #if protein occurs twice gets 5 points, thrice gets 10 points etc etc
      protein_score = count_protein[recipe.main_protein] * 5 - 5 if count_protein[recipe.main_protein] != 0 else 0 
      source_score = count_source[recipe.source] * 5 - 5 if count_source[recipe.source] !=0 else 0
      four_starred_protein_score = count_four_starred_protein[recipe.main_protein] * 4 - 4 if count_four_starred_protein[recipe.main_protein] != 0 else 0
      four_starred_source_score = count_four_starred_source[recipe.source] * 4 - 4 if count_four_starred_source[recipe.source] !=0 else 0
      two_starred_protein_score = count_two_starred_protein[recipe.main_protein] * 4 - 4 if count_two_starred_protein[recipe.main_protein] != 0 else 0
      two_starred_source_score = count_two_starred_source[recipe.source] * 4 - 4 if count_two_starred_source[recipe.source] !=0 else 0 
      one_starred_protein_score = count_one_starred_protein[recipe.main_protein] * 5 - 5 if count_one_starred_protein[recipe.main_protein] != 0 else 0
      one_starred_source_score = count_one_starred_source[recipe.source] * 5 - 5 if count_one_starred_source[recipe.source] !=0 else 0      


      combined_score = protein_score + four_starred_protein_score + four_starred_source_score - two_starred_protein_score - two_starred_source_score - one_starred_protein_score
      # print(combined_score)
      recipe_list_with_scores.append({ "recipe":recipe, "score": combined_score })


    #sorts the recipe in 

    recipe_list_with_scores.sort(key=lambda x: x['score'], reverse=True)
    final_recipe_list_with_score = recipe_list_with_scores[:5]
    print(final_recipe_list_with_score)
    #get rid of score so i can reuse serialiser. score isn't useful anymore because recipes already sorted( highest rated first). and importnatly, list comprehension preserves the order
    final_suggested_recipes = [dic['recipe'] for dic in final_recipe_list_with_score]

    # print(final_suggested_recipes)
    # print(recipe_list_with_scores)



    #average recipe calorie 
    # average_recipe_calorie = statistics.mean(calorie_per_serving_list) 



 
    serializer = BasicRecipeSerializer(final_suggested_recipes, many=True)
    return Response(serializer.data)

#dictionary two elements/fields: one is recipe object and one is score for that recipe object 