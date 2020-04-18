from django.urls import path

from main.views.recipe import AllRecipesListView, FilteredRecipeView, FridgeRecipeView

urlpatterns = [
  path('recipes/', AllRecipesListView.as_view()),
  path('recipes/type/<str:filter>', FilteredRecipeView.as_view()),
  path('recipes/fridge/<str:query>', FridgeRecipeView.as_view())
]