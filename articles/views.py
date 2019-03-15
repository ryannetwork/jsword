from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


class ArticleListCreate(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(ArticleListCreate, self).dispatch(*args, **kwargs)
