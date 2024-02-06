from django.urls import path
from .views import CreateClassroom, RetrieveClassroom, ListClassrooms, AddTeacher, RemoveTeacher, AddStudent, RemoveStudent

urlpatterns = [
    path('classroom/create/', CreateClassroom.as_view(), name='classroom-create'),   
    path('classroom/add-teacher/', AddTeacher.as_view(), name='classroom-add-teacher'),
    path('classroom/remove-teacher/', RemoveTeacher.as_view(), name='classroom-remove-teacher'),
    path('classroom/add-student/', AddStudent.as_view(), name='classroom-add-student'),
    path('classroom/remove-student/', RemoveStudent.as_view(), name='classroom-remove-student'),
    path('classroom/<str:class_id>/', RetrieveClassroom.as_view(), name='retrieve-classroom'),
    path('classrooms/<str:user_type>/<str:profile_uid>/', ListClassrooms.as_view(), name='list-classrooms')
]
