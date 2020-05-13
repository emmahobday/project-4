### General Assembly, Software Engineering Immersive

# project-4

## Recipedia
by [Emma Hobday](https://emmahobday.github.io/) and [Denise Cheung](https://denisecheung3.github.io/).

Fridge half-full and need inspiration? Recipedia lets users input ingredients they've got and suggests recipes for them. You can browse, search and filter recipes using a range of advanced search features and, if you find something you like, add it to your personal meal planner. If you're missing any ingredients, add them to your personal shopping list and check them off once you've got them. Rate recipies out of five, and you'll receive personalised recipe suggestions based on your tastes.

Check it out here.

![Homepage](screenshots/homepage.jpg)

This is my fourth and final project with General Assembly's Software Engineering Immersive course. This was a paired project, completed in one week. All the project planning was collaborative - we came up with a really detailed plan that we both felt very excited about. We pair-programmed the first day, setting up project from scratch and designing the backend models together. From there, we started each day with a paired stand-up, during which we decided what features we'd each work on individually that day. We pair-programmed some features, and collaborated throughout each day with problem solving and helping to debug our code. 


## Table of contents

* [Brief](#brief) 
* [Technology used](#tech) 
* [Approach](#approach) 
    * [Creating our database](#database)
    * [Backend models](#models)
    * [Browse Recipies](#browse)
    * [What's in your fridge?](#fridge)
    * [View a recipe](single)
      * [Health tags](#healthtags)
      * [Nutritional information](#nutri)
    * [Search and filter recipies](#search)
    * [Recipe of the Day](#rotd)
	* [Register/login](#register) 
	* [Additional features for logged-in users](#additional)	
	  * [Rate recipes](#rate)	
	  * [Menu planner](#menu)
	  * [Shopping list](#shopping)
*  [Challenges](#challenges)
*  [Lessons learned](#learning)
*  [Future development ideas](#future)

<a name="brief"></a>
## Brief
* Choose to work solo or in a team
* Build a full-stack application by making your own backend and your own front-end
* Use a Python Django API using Django REST Framework to serve your data from a Postgres database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers.
* Be deployed online so it’s publicly accessible.

<a name="tech"></a>
## Technologies Used

* JavaScript (ES6)
* React.js
* Python
* Django
* PostgreSQL
* SCSS
* HTML
* Webpack
* React-scheduler
* Moment
* Heroku
* Git and GitHub
* Bulma
* Google Fonts

<a name="approach"></a>
## Approach

We started by building our backend models. We planned and created these very carefully, ensuring that they'd work for all our planned functionality. We then created our MVP - a database of recipies, accessed with advanced search and filter functions. We then worked on our stretch goals - the meal planner, the shopping list and the recipe ratings. Towards the end of the project, we focused on styling.

<a name="database"></a>
## Creating our database
We decided to get our recipe data from a public API, Edamam. This saved us the job of sourcing a substantial amount of recipies independently, and we were still able to have some control over how the data was organised in our PostgreSQL database. After examining the API documentation, we decided which fields we wanted to store. We wanted to add an additional field called 'main protein', which we would use to categorise recipes - we did this by using the search term used in the API request. So, we sent a GET request with the search term 'chicken' for 50 recipies, and stored these in our database with the field 'mainProtein' as 'chicken'.

We automated the population of our database using Python. We created a python file for each mainProtein source we wanted in a 'management' folder, which contained the following code:

```
class Command(BaseCommand):
    def handle(self, *args, **options): 
        def get_recipe_info():
            api_url = f'{api_url_base}?q=beans&app_id={app_id}&app_key={app_key}&from=0&to=50'
            response = requests.get(api_url, headers=headers)
            if response.status_code == 200:
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
```
 We replaced the query `q=` on the fourth line with the name of each main protein in it's file. Running this file then made the request, and populated our database with the precise fields we wanted. 
 
 <a name="models"></a>
## Backend Models

We needed several models: User, recipe, healthlabel, rating, shopping_list, recipe_to_buy_for, meal_plan_recipe. We started by making these. We had sketched a wireframe of how our models would interact. Our central models are User and recipe.

**Users**
Initially, we planned to hold more information on the User model, such as 'healthLabels' and 'fiveStarRecipes'. This seemed to make the most sense to us conceptually, since we'd want to retrieve this information for a user frequently. Django provides an inbuilt User authentication system, which we modified with a customer User model. However, we ran into issues with adding manyToMany fields on a custom user - we think this is something to do with Django's user model package that we weren't able to override. Therefore, we had to restructure our data a little, removing these fields from the User model and putting them within the related models - for example, our health_labels model contains a ManyToManyField, called ‘user’, with the related name ‘health_labels’. Therefore, our custom User model ended up being very straightforward, with only the field 'image', a character field to allow users to link a profile picture with a URL:

```
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    image = models.CharField(max_length=500, blank=True, null=True)
```

We created a User serializer, which is used for login and register. I'll talk about how we did this in the Register section. We also created a PopulateUserSerializer which has all the desired fields, including health_labels, and created a UserView in our `views.py` which returns users using the PopulateUserSerializer.

```
class PopulateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'image', 'health_labels', 'comments',)
```

```
class UserView(APIView):
  def get(self, request):
    users = User.objects.all()
    serialized_users = PopulateUserSerializer(users, many=True)
    return Response(serialized_users.data)
```

**Recipies**

Our recipe model specifies all the fields required in the database for each recipe. The ArrayField took a bit of debugging to get it working correctly, but we're glad we persevered, because using arrays for health_labels etc is ideal for managing the data in the way we wanted.

```
from django.contrib.postgres.fields import ArrayField

class Recipe(models.Model):
  dish_name = models.CharField(max_length=500, null=True)
  main_protein = models.CharField(max_length=100, null=True)
  image = models.CharField(max_length=5000, null=True)
  source = models.CharField(max_length=500, null=True)
  instructions_url = models.CharField(max_length=500, null=True)
  servings = models.IntegerField(null=True)
  diet_Labels = ArrayField(models.CharField(max_length=50, blank=True, null=True))
  health_Labels = ArrayField(models.CharField(max_length=50, blank=True, null=True))
  ingredients_lines = ArrayField(models.CharField(max_length=50, blank=True, null=True))
  ingredients = ArrayField(models.CharField(max_length=50, blank=True, null=True))
  calories = models.FloatField(null=True)
  fat = models.FloatField(null=True)
  fat_unit = models.CharField(max_length= 100, null=True)
  sat_fat = models.FloatField(null=True)
  sat_fat_unit = models.CharField(max_length= 100, null=True)
  trans_fat = models.FloatField(null=True)
  trans_fat_unit = models.CharField(max_length= 100, null=True)
  carbs = models.FloatField(null=True)
  carbs_unit = models.CharField(max_length= 100, null=True)
  sugars = models.FloatField(null=True)
  sugars_unit = models.CharField(max_length= 100, null=True)
  protein = models.FloatField(null=True)
  protein_unit = models.CharField(max_length= 100, null=True)
  cholesterol = models.FloatField(null=True)
  cholesterol_unit= models.CharField(max_length= 100, null=True)
  sodium = models.FloatField(null=True)
  sodium_unit = models.CharField(max_length= 100, null=True)
  calcium = models.FloatField(null=True)
  calcium_unit = models.CharField(max_length= 100, null=True)

  def __str__(self):
      return self.dish_name
```

We needed two serializers for recipies: basic and detailed. The basic recipe serializer is used whenever we are returning list views - a list of recipes that match a given criteria. The detailed serializer contains all fields, and is used when we need to return a single recipe. The detailed serializer is more complex because we also include the rating the user has given the recipe, if indeed they have:

```
class BasicRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id', 'dish_name', 'main_protein', 'image', 'source', 'instructions_url',
                  'servings', 'ingredients_lines', 'diet_Labels', 'health_Labels')


class DetailedRecipeSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ('id', 'dish_name', 'main_protein', 'image', 'source', 'instructions_url', 'servings', 'diet_Labels',
                  'health_Labels', 'ingredients_lines', 'ingredients', 'calories', 'fat', 'fat_unit', 'sat_fat', 'sat_fat_unit',
                  'trans_fat', 'trans_fat_unit', 'carbs', 'carbs_unit', 'sugars', 'sugars_unit', 'protein', 'protein_unit',
                  'cholesterol', 'cholesterol_unit', 'sodium', 'sodium_unit', 'calcium', 'calcium_unit', 'rating')

    def get_rating(self, obj):
        user = self.context["request"].user
        print(user.is_authenticated)
        if user.is_authenticated:  # check if user is logged in
            user_rating = obj.ratings.filter(user=user).first()
            print(user_rating)
            if user_rating:  # if user logged in but never rated, rating field will be null
                return user_rating.rating_num
        return None  # if user isn't logged in rating field will be null
```

Our `views.py` for recipies include many different views for the different search methods we created.We used pagination to provide 40 search results per search - necessary since our database contains over 1000 recipes. The basic recipe list view and detail view are simply:

```
class AllRecipesPagination(PageNumberPagination):
    page_size = 40
    page_size_query_param = 'page_size'
    max_page_size = 40


class AllRecipesListView(ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = BasicRecipeSerializer
    pagination_class = AllRecipesPagination

    def get(self, request):
        recipes = self.paginate_queryset(Recipe.objects.all())
        serializer = BasicRecipeSerializer(recipes, many=True)
        return self.get_paginated_response(serializer.data)


class RecipeDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = DetailedRecipeSerializer
```




<a name="browse"></a>
## Browse recipies

*view all recipies - scroll layout - challenge of 'promise' when refactoring. also they come in a random order.
*can click into main protein
* The promises thing in allrecipesbytype - wanted to map over things in return, useEffect and state. Managed it using promises. 


<a name="fridge"></a>
## What's in your fridge?

*hook into site
backend logic
frontend display

Fridge search - decided to conduct the search on the backend, as running a filter on data using Django is relatively trivial by filtering the query set, and this also means only necessary data is sent over from backend to frontend, particularly when the data is paginated. 

I included the user’s search terms in the URL, joined by ‘&’, and then wrote a view that separates the search terms out and filters using them as separate terms. The terms are set to an empty string if the user supplies less than three.


<a name="single"></a>
## View a recipe

![Single recipe](screenshots/single-recipe.jpg)


<a name="healthtags"></a>
## Health tags



<a name="nutri"></a>
## Nutritional information

![Nutritional information](screenshots/nutri.jpg)


<a name="search"></a>
## Search and filter recipies

Search functionality

Made backend routes that will return things

Pulled in from URL - best way!

Fridge takes up to 3 items

For general search, OMG writing the code to loop over x many search terms. We tried using set() and a load of other stuff. Now uses a loop in the right place.



Talk about initially trying to translate JS into Python, but then gradually finding the right way to write it in Python

Advanced search - creating the search string on front end, receiving and breaking it down on the backend, all through URL




<a name="rotd"></a>
## Recipe of the day
*problem: needs to be a random recipe every day. don't want to tick through recipes in order, as they're grouped by type (e.g. a load of chicken recipes for months). So need a generate a number 1-1000 each day, and maintain it for everyone all day. Best way: use the date as a unique number to start off the generation.

![Recipe of the day](screenshots/rotd.jpg)


<a name="register"></a>
## Register/login




<a name="additional"></a>
## Additional features for logged-in users




<a name="rate"></a>
## Rate recipies



<a name="menu"></a>
## Menu planner




<a name="shopping"></a>
## Shopping list



<a name="challenges"></a>
## Challenges



<a name="learning"></a>
## Lessons learned

Using new things - hooks, backend search, libraries - minimal pie chart, intro to SVG

Focus on creating a really well designed feature rather than loads of shite ones. So a really robust search function, ux that flows, considering user routes, clear error handling

Bulma navbar - the struggles of making a component look a certain way (centred logo) when it’s not designed for that.


<a name="future"></a>
## Future development ideas

Remove duplicate entries maybe using set()
User profile
Set vegetarian etc, and return ONLY search results that fit that, although that would rule out certain sections of ‘all recipes’. Is that what people want?
CSS - set up default colours, make generic classes e.g. main-title etc so you can apply these all over the site, rather than making specifics for each component
