from django.urls import path

from main.views.recipe import AllRecipesListView, RecipeDetailView
from main.views.rating import RatingListView, UsersRatingListView
from main.views.suggested_recipes import SuggestedRecipesListView
from main.views.recipe import AllRecipesListView, RecipeDetailView, FilteredRecipeView, FridgeRecipeView
from main.views.rating import RatingListView

urlpatterns = [
  path('recipes/', AllRecipesListView.as_view()),
  path('recipes/type/<str:filter>', FilteredRecipeView.as_view()),
  path('recipes/fridge/<str:query>', FridgeRecipeView.as_view()),
  path('recipe/<int:pk>/', RecipeDetailView.as_view()),
  path('ratings/', RatingListView.as_view()),
  path('user/fivestarredratings/',UsersRatingListView.as_view()),
  path('user/suggestedrecipes/', SuggestedRecipesListView.as_view())

]
