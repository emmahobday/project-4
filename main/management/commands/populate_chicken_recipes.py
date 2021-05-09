from django.core.management.base import BaseCommand
from main.models.recipe import Recipe
import math 
import json
import requests
app_id = "b861958e"
app_key = "023cf911965162586a160499ed3c6592"
api_url_base = "https://api.edamam.com/search"
headers = {'Content-Type': 'application/json'}


class Command(BaseCommand):
    def handle(self, *args, **options): 
        def get_recipe_info():
            api_url = f'{api_url_base}?q=chicken&app_id={app_id}&app_key={app_key}&from=0&to=50'
            response = requests.get(api_url, headers=headers)
            if response.status_code == 200:
                # print(json.loads(response.content.decode('utf-8')))
                return json.loads(response.content.decode('utf-8'))
            else:
                return None


        recipes = get_recipe_info()
        protein = recipes['q']
        print(protein)
        for hit in recipes['hits']:
            print(hit['recipe']['label'])
            createRecipe = Recipe.objects.create(
                dish_name = hit['recipe']['label'],
                main_protein = protein,
                image = hit['recipe']['image'],
                source = hit['recipe']['source'],
                instructions_url = hit['recipe']['url'],
                servings = hit['recipe']['yield'],
                diet_Labels = hit['recipe']['dietLabels'],
                health_Labels = hit['recipe']['healthLabels'],
                ingredients_lines = hit['recipe']['ingredientLines'],
                ingredients = hit['recipe']['ingredients'],
                calories = math.ceil(hit['recipe']['calories']),
                fat = hit['recipe']['totalNutrients']['FAT']['quantity'],
                fat_unit = hit['recipe']['totalNutrients']['FAT']['unit'],
                sat_fat = hit['recipe']['totalNutrients']['FASAT']['quantity'],
                sat_fat_unit = hit['recipe']['totalNutrients']['FASAT']['unit'],
                trans_fat  = hit['recipe']['totalNutrients']['FATRN']['quantity'],
                trans_fat_unit = hit['recipe']['totalNutrients']['FATRN']['unit'],
                carbs = hit['recipe']['totalNutrients']['CHOCDF']['quantity'],
                carbs_unit = hit['recipe']['totalNutrients']['CHOCDF']['unit'],
                sugars = hit['recipe']['totalNutrients']['SUGAR']['quantity'], 
                sugars_unit = hit['recipe']['totalNutrients']['SUGAR']['unit'],
                protein = hit['recipe']['totalNutrients']['PROCNT']['quantity'],
                protein_unit = hit['recipe']['totalNutrients']['PROCNT']['unit'],
                cholesterol = hit['recipe']['totalNutrients']['CHOLE']['quantity'],
                cholesterol_unit = hit['recipe']['totalNutrients']['CHOLE']['unit'], 
                sodium = hit['recipe']['totalNutrients']['NA']['quantity'], 
                sodium_unit = hit['recipe']['totalNutrients']['NA']['unit'],
                calcium = hit['recipe']['totalNutrients']['CA']['quantity'],
                calcium_unit = hit['recipe']['totalNutrients']['CA']['unit']
            )