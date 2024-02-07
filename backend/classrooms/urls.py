from django.urls import path
from .views import CreateClassroom, DeleteClassroom, RetrieveClassroom, ListClassrooms, TeacherList, StudentList, AddTeacher, RemoveTeacher, AddStudent, RemoveStudent

urlpatterns = [
    path('classroom/create/', CreateClassroom.as_view(), name='classroom-create'),
    path('classroom/<str:class_id>/delete/', DeleteClassroom.as_view(), name='classroom-delete'),
    path('classroom/<str:class_id>/teachers/', TeacherList.as_view(), name='classroom-teachers'),
    path('classroom/<str:class_id>/students/', StudentList.as_view(), name='classroom-students'),
    path('classroom/add-teacher/', AddTeacher.as_view(), name='classroom-add-teacher'),
    path('classroom/remove-teacher/', RemoveTeacher.as_view(), name='classroom-remove-teacher'),
    path('classroom/add-student/', AddStudent.as_view(), name='classroom-add-student'),
    path('classroom/remove-student/', RemoveStudent.as_view(), name='classroom-remove-student'),
    path('classroom/<str:class_id>/', RetrieveClassroom.as_view(), name='retrieve-classroom'),
    path('classroom/<str:user_type>/<str:profile_uid>/', ListClassrooms.as_view(), name='list-classrooms')
]
