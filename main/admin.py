from django.contrib import admin
from .models import Recipe, HealthLabel, Comment, Rating

# Register your models here.
admin.site.register(Recipe)
admin.site.register(HealthLabel)
admin.site.register(Comment)
admin.site.register(Rating)
