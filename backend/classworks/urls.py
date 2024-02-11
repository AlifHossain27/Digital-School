from django.urls import path
from .views import CreateClasswork

urlpatterns = [
    path('classwork/create/', CreateClasswork.as_view(), name='classwork-create'),
]
