from django.urls import path
from .views import AdminSignupAPI, StaffSignupAPI, TeacherSignupAPI, StudentSignupAPI, AdminLoginAPI, StaffLoginAPI, TeacherLoginAPI, StudentLoginAPI, UserAPI, LogoutAPI

urlpatterns = [
    path("admin/signup/", AdminSignupAPI.as_view(), name= "signup"),
    path("staff/signup/", StaffSignupAPI.as_view(), name= "signup"),
    path("teacher/signup/", TeacherSignupAPI.as_view(), name= "signup"),
    path("student/signup/", StudentSignupAPI.as_view(), name= "signup"),
    path("admin/login/", AdminLoginAPI.as_view(), name= "login"),
    path("staff/login/", StaffLoginAPI.as_view(), name= "login"),
    path("teacher/login/", TeacherLoginAPI.as_view(), name= "login"),
    path("student/login/", StudentLoginAPI.as_view(), name= "login"),
    path("me/", UserAPI.as_view(), name= "me"),
    path("logout/", LogoutAPI.as_view(), name= "logout")
]