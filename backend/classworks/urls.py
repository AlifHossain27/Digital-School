from django.urls import path
from .views import CreateClasswork, ListClassworks, RetrieveUpdateDeleteClasswork, CreateClassworkSubmission, RetrieveClassworkSubmissionsList

urlpatterns = [
    path('classwork/create/', CreateClasswork.as_view(), name='classwork-create'),
    path('classwork/classroom/<str:class_id>/', ListClassworks.as_view(), name='classwork-list'),
    path('classwork/<str:classwork_id>/', RetrieveUpdateDeleteClasswork.as_view(), name='classwork-retrieve'),
    path('classwork/<str:classwork_id>/submission/create/', CreateClassworkSubmission.as_view(), name='classwork-create-submission'),
    path('classwork/<str:classwork_id>/classroom/<str:class_id>/', RetrieveClassworkSubmissionsList.as_view(), name='classwork-submission-retrieve'),
]
