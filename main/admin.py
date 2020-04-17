from django.contrib import admin
from .models import Recipe, HealthLabel, Comment

# Register your models here.
admin.site.register(Recipe)
admin.site.register(HealthLabel)
admin.site.register(Comment)