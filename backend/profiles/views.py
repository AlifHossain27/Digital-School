from django.shortcuts import render
from rest_framework import views, response, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import StaffProfileSerializer, StaffProfilePictureSerializer, TeacherProfileSerializer, StudentProfileSerializer
from users.permissions import IsAdministrator, IsStaff, IsTeacher, IsStudent
from users.authentication import Authentication
from . import services


# Profile List
class RetrieveStaffProfiles(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator]
    def get(self, request):
        profiles = services.staff_profile_list()
        serializer = StaffProfileSerializer(profiles, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    
class RetrieveTeacherProfiles(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff]
    def get(self, request):
        profiles = services.teacher_profile_list()
        serializer = TeacherProfileSerializer(profiles, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    
class RetrieveStudentProfiles(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff]
    def get(self, request):
        profiles = services.student_profile_list()
        serializer = StudentProfileSerializer(profiles, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

