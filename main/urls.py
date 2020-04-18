from django.urls import path

from main.views.recipe import AllRecipesListView, RecipeDetailView
from main.views.rating import RatingListView, UsersRatingListView
from main.views.suggested_recipes import SuggestedRecipesListView

urlpatterns = [
  path('recipes/', AllRecipesListView.as_view()),
  path('recipe/<int:pk>/', RecipeDetailView.as_view()),
  path('ratings/', RatingListView.as_view()),
  path('user/fivestarredratings/',UsersRatingListView.as_view()),
  path('user/suggestedrecipes/', SuggestedRecipesListView.as_view())

]

