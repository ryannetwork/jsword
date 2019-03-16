from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('api/<int:pk>/', views.ArticleDetail.as_view()),
    path('api/', views.ArticleListCreate.as_view()),
]
