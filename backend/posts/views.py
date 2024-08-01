from django.shortcuts import render
from rest_framework import views, response, status
from .serializers import ClassroomPostSerializer, CreateUpdateClassroomPostSerializer
from . import services
from .models import ClassroomPost
from users.permissions import IsAdministrator, IsStaff, IsTeacher, IsStudent
from users.authentication import Authentication

# Create Update Delete Classroom Post View
class CreateUpdateClassroomPostView(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsTeacher]

    def post(self, request):
        serializer = CreateUpdateClassroomPostSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.create_post(user = request.user, post_dc = data)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, post_id):
        serializer = CreateUpdateClassroomPostSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.update_post(user = request.user, post_id = post_id, post_dc = data)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, post_id):
        data = services.del_post(user=request.user, post_id=post_id)
        return response.Response(data=data, status=status.HTTP_200_OK)
    
# Retrieve Classroom Posts View
class ClassroomPostView(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsStaff | IsTeacher | IsStudent]

    def get(self, request, class_id):
        posts = services.get_posts(class_id=class_id)
        serializer = ClassroomPostSerializer(posts, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
