from django.urls import path
from .views import RetrieveStaffProfiles, RetrieveTeacherProfiles, RetrieveStudentProfiles

urlpatterns = [
    path("staffs/", RetrieveStaffProfiles.as_view(), name = "Staff List"),
    path("teachers/", RetrieveTeacherProfiles.as_view(), name = "Teacher List"),
    path("students/", RetrieveStudentProfiles.as_view(), name = "Student List"),
]