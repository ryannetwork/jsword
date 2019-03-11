from django.db import models
from django.db.models import Q
from django.contrib.auth.models import User, Group


class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-updating
    'created_at' and 'updated_at' fields.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class AuthManager(models.Manager):

    use_for_related_fields = True

    def available(self, user, **kwargs):
        if user.is_authenticated:
            return self.filter(Q(auth='public') | (Q(auth='group') & Q(group__user=user)) | Q(user=user))
        else:
            return self.filter(auth='all')


class AuthModel(models.Model):
    AUTH_CHOICES = (
        ('user', 'user'),
        ('group', 'group'),
        ('public', 'public'),
        ('all', 'all'),
    )
    auth = models.CharField(choices=AUTH_CHOICES, max_length=8, default='user', verbose_name='アクセス権')
    user = models.ForeignKey(User, models.SET_NULL, null=True, blank=True)
    group = models.ForeignKey(Group, models.SET_NULL, null=True, blank=True)

    objects = AuthManager()

    class Meta:
        abstract = True

