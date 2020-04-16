from django.urls import path

from main.views.recipe import AllRecipesListView

urlpatterns = [
  path('recipes/', AllRecipesListView.as_view())
]