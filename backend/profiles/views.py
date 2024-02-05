from django.shortcuts import render
from rest_framework import views, response, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import StaffProfileSerializer, StaffProfilePictureSerializer, TeacherProfileSerializer, TeacherProfilePictureSerializer, StudentProfileSerializer, StudentProfilePictureSerializer
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

# Retrieving Staff Profile and Updating Profile
class RetrieveUpdateStaffProfile(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff]

    def get(self, request, profile_uid): 
        profile = services.staff_profile_detail(profile_uid=profile_uid)
        serializer = StaffProfileSerializer(profile)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, profile_uid):
        serializer = StaffProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = serializer.validated_data
        serializer.instance = services.update_staff_profile(user = request.user, profile_uid= profile_uid, profile_data = profile)

        return response.Response(data = serializer.data)
    
class UpdateStaffProfilePicture(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff]
    parser_classes = (MultiPartParser, FormParser)
    
    def put(self, request, profile_uid):
        serializer = StaffProfilePictureSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = serializer.validated_data
        serializer.instance = services.update_staff_profile_picture(user = request.user, profile_uid= profile_uid, profile_data = profile)

        return response.Response(data = serializer.data)

# Retrieving Teacher Profile and Updating Profile  
class RetrieveUpdateTeacherProfile(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff | IsTeacher]

    def get(self, request, profile_uid): 
        profile = services.teacher_profile_detail(profile_uid=profile_uid)
        serializer = TeacherProfileSerializer(profile)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, profile_uid):
        serializer = TeacherProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = serializer.validated_data
        serializer.instance = services.update_teacher_profile(user = request.user, profile_uid= profile_uid, profile_data = profile)

        return response.Response(data = serializer.data)
    
class UpdateTeacherProfilePicture(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsTeacher]
    parser_classes = (MultiPartParser, FormParser)
    
    def put(self, request, profile_uid):
        serializer = TeacherProfilePictureSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = serializer.validated_data
        serializer.instance = services.update_teacher_profile_picture(user = request.user, profile_uid= profile_uid, profile_data = profile)

        return response.Response(data = serializer.data)

# Retrieving Student Profile and Updating Profile
class RetrieveUpdateStudentProfile(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff | IsTeacher | IsStudent]

    def get(self, request, profile_uid): 
        profile = services.student_profile_detail(profile_uid=profile_uid)
        serializer = StudentProfileSerializer(profile)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, profile_uid):
        serializer = StudentProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = serializer.validated_data
        serializer.instance = services.update_student_profile(user = request.user, profile_uid= profile_uid, profile_data = profile)

        return response.Response(data = serializer.data)
    
class UpdateStudentProfilePicture(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsStudent]
    parser_classes = (MultiPartParser, FormParser)
    
    def put(self, request, profile_uid):
        serializer = StudentProfilePictureSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = serializer.validated_data
        serializer.instance = services.update_student_profile_picture(user = request.user, profile_uid= profile_uid, profile_data = profile)

        return response.Response(data = serializer.data)