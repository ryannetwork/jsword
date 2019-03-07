from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views import View


class HomeView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        context = {'message': 'welcome to Django!'}
        return render(request, 'accounts/home.html', context)


home = HomeView.as_view()
