from django.urls import path

from main.views.recipe import AllRecipesListView, RecipeDetailView, MainProteinRecipeView, MainProteinSummaryView, FridgeRecipeView, DietLabelRecipeView
from main.views.rating import RatingListView, UsersRatingListView
from main.views.suggested_recipes import SuggestedRecipesListView
from main.views.recipe_to_buy_for import RecipeToBuyForListView


urlpatterns = [
    path('recipes/', AllRecipesListView.as_view()),
    path('recipes/type/<str:query>', MainProteinRecipeView.as_view()),
    path('recipes/dietlabel/<str:query>', DietLabelRecipeView.as_view()),
    path('recipes/fridge/<str:query>', FridgeRecipeView.as_view()),
    path('recipe/<int:pk>/', RecipeDetailView.as_view()),
    path('ratings/', RatingListView.as_view()),
    path('user/fivestarredratings/', UsersRatingListView.as_view()),
    path('user/suggestedrecipes/', SuggestedRecipesListView.as_view()),
    # path('allrecipestobuyfor', RecipeToBuyForListView.as_view())
    path('allrecipestobuyfor/<int:pk>', RecipeToBuyForListView.as_view())
    path('recipes/type/summary/<str:query>', MainProteinSummaryView.as_view()),

]
