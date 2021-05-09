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
            api_url = f'{api_url_base}?q=falafel&app_id={app_id}&app_key={app_key}&from=0&to=10'
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
                fat = hit['recipe']['totalNutrients'].get('FAT', {}).get('quantity'),
                fat_unit = hit['recipe']['totalNutrients'].get('FAT', {}).get('unit'),
                sat_fat = hit['recipe']['totalNutrients'].get('FASAT', {}).get('quantity'),
                sat_fat_unit = hit['recipe']['totalNutrients'].get('FASAT', {}).get('unit'),
                trans_fat  = hit['recipe']['totalNutrients'].get('FATRN', {}).get('quantity'),
                trans_fat_unit = hit['recipe']['totalNutrients'].get('FATRN', {}).get('unit'),
                carbs = hit['recipe']['totalNutrients'].get('CHOCDF', {}).get('quantity'),
                carbs_unit = hit['recipe']['totalNutrients'].get('CHOCDF', {}).get('unit'),
                sugars = hit['recipe']['totalNutrients'].get('SUGAR', {}).get('quantity'),
                sugars_unit = hit['recipe']['totalNutrients'].get('SUGAR', {}).get('unit'),
                protein = hit['recipe']['totalNutrients'].get('PROCNT', {}).get('quantity'),
                protein_unit = hit['recipe']['totalNutrients'].get('PROCNT', {}).get('unit'),
                cholesterol = hit['recipe']['totalNutrients'].get('CHOLE', {}).get('quantity'),
                cholesterol_unit = hit['recipe']['totalNutrients'].get('CHOLE', {}).get('unit'),
                sodium = hit['recipe']['totalNutrients'].get('NA', {}).get('quantity'),
                sodium_unit = hit['recipe']['totalNutrients'].get('NA', {}).get('unit'),
                calcium = hit['recipe']['totalNutrients'].get('CA', {}).get('quantity'),
                calcium_unit = hit['recipe']['totalNutrients'].get('CA', {}).get('unit')
            )