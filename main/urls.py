from django.urls import path

from main.views.recipe import AllRecipesListView, RecipeDetailView
from main.views.rating import RatingListView

urlpatterns = [
  path('recipes/', AllRecipesListView.as_view()),
  path('recipe/<int:pk>/', RecipeDetailView.as_view()),
  path('ratings/', RatingListView.as_view()) 
]