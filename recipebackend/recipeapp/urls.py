from django.urls import path
from .views import RecipeListCreate, RecipeRetrieveUpdateDestroy

urlpatterns = [
    path('', RecipeListCreate.as_view(), name='recipe-list-create'),
    path('<int:pk>/', RecipeRetrieveUpdateDestroy.as_view(), name='recipe-retrieve-update-destroy'),
]
