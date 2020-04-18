from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response

# shorthand/ generic way
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView

# importing status codes
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT

from .serializers.recipe import BasicRecipeSerializer, DetailedRecipeSerializer

from .models.recipe import Recipe 