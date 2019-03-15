from django.db import models
from core.models import TimeStampedModel, AuthModel


class Article(TimeStampedModel, AuthModel):
    title = models.CharField(max_length=256, verbose_name='タイトル')
    content = models.TextField(verbose_name='本文')
    is_directory = models.BooleanField(default=False, verbose_name='ディレクトリ')
    parent = models.ForeignKey('Article', null=True, blank=True, on_delete=models.SET_NULL)
    headline = models.CharField(blank=True, default='', max_length=64, verbose_name='見出し')
    permit_comment = models.BooleanField(default=False, verbose_name='コメント許可')

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return "/articles/%i" % self.id

    def parents(self, reverse=True):
        p_list = []
        p = self.parent
        while p:
            p_list.append(p)
            p = p.parent
        if reverse:
            p_list.reverse()
        return p_list

    class Meta:
        ordering = ['-is_directory']
