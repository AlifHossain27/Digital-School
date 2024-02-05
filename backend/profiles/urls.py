from django.urls import path
from .views import RetrieveStaffProfiles, RetrieveUpdateStaffProfile, UpdateStaffProfilePicture, RetrieveTeacherProfiles, RetrieveUpdateTeacherProfile, UpdateTeacherProfilePicture, RetrieveStudentProfiles

urlpatterns = [
    path("staffs/", RetrieveStaffProfiles.as_view(), name = "Staff List"),
    path("teachers/", RetrieveTeacherProfiles.as_view(), name = "Teacher List"),
    path("students/", RetrieveStudentProfiles.as_view(), name = "Student List"),
    path("staff/<str:profile_uid>/", RetrieveUpdateStaffProfile.as_view(), name = "Staff Profile"),
    path("staff/<str:profile_uid>/profile-picture/", UpdateStaffProfilePicture.as_view(), name = "Staff Profile Picture"),
    path("teacher/<str:profile_uid>/", RetrieveUpdateTeacherProfile.as_view(), name = "Teacher Profile"),
    path("teacher/<str:profile_uid>/", UpdateTeacherProfilePicture.as_view(), name = "Teacher Profile Picture")
]