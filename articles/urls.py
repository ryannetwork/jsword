from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('api/', views.ArticleListCreate.as_view()),
]
