from django.urls import path

from main.views.recipe import AllRecipesListView, RecipeDetailView

urlpatterns = [
  path('recipes/', AllRecipesListView.as_view()),
  path('recipe/<int:pk>/', RecipeDetailView.as_view())


]