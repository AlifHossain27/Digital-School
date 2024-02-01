from rest_framework import permissions
from .models import Admin, Staff, Teacher, Student

class IsAdministrator(permissions.BasePermission):
    def has_permission(self, request, view):

        return request.user and request.user.is_authenticated and isinstance(request.user, Admin)
    
class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):

        return request.user and request.user.is_authenticated and isinstance(request.user, Staff)
    
class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):

        return request.user and request.user.is_authenticated and isinstance(request.user, Teacher)
    
class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):

        return request.user and request.user.is_authenticated and isinstance(request.user, Student)