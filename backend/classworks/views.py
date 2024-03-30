from rest_framework import views, response, status
from .serializers import ClassworkSerializer, CreateUpdateClassworkSerializer, ClassworkSubmissionSerializer, CreateUpdateClassworkSubmissionSerializer, ClassworkCommentSerializer, ClassworkPrivateCommentSerializer
from . import services
from .models import ClassworkSubmission
from users.permissions import IsAdministrator, IsStaff, IsTeacher, IsStudent
from users.authentication import Authentication
from django.shortcuts import get_object_or_404

# Create Classwork View
class CreateClasswork(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsTeacher]
    def post(self, request):
        serializer = CreateUpdateClassworkSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.create_classwork(user= request.user,classwork_dc = data)
        return response.Response(data=serializer.data)

# List all the classworks in the Classroom
class ListClassworks(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff | IsTeacher | IsStudent]
    def get(self, request, class_id):
        classworks = services.classwork_list(class_id=class_id)
        serializer = ClassworkSerializer(classworks, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    
# Retrieve Update Delete Classwork
class RetrieveUpdateDeleteClasswork(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsTeacher | IsStudent]
    def get(self, request, classwork_id):
        classwork = services.get_classwork(classwork_id=classwork_id)
        serializer = ClassworkSerializer(classwork)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    def put(self, request, classwork_id):
        serializer = CreateUpdateClassworkSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.update_classwork(user= request.user, classwork_id=classwork_id, classwork_dc=data)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
    def delete(self, request, classwork_id):
        data = services.delete_classwork(user= request.user, classwork_id=classwork_id)
        return response.Response(data=data, status=status.HTTP_200_OK)
    
# Create Classwork Submission
class CreateClassworkSubmission(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsStudent]
    def post(self, request, classwork_id):
        serializer = CreateUpdateClassworkSubmissionSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.create_classwork_submission(user=request.user, classwork_id=classwork_id, classwork_submission_dc=data)
        return response.Response(data=serializer.data)
    
# Retrieve Classwork Submissions List
class RetrieveClassworkSubmissionsList(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsTeacher | IsStudent]
    def get(self, request, classwork_id, class_id):
        submission = services.get_classwork_submission_list(user=request.user, classroom_id=class_id, classwork_id=classwork_id)
        serializer = ClassworkSubmissionSerializer(submission, many=True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
    
# Retrieve Classwork Submission
class RetrieveClassworkSubmission(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsStudent]
    def get(self, request, classwork_id, class_id):
        submission = services.get_classwork_submission(user=request.user, classroom_id=class_id, classwork_id=classwork_id)
        serializer = ClassworkSubmissionSerializer(submission, many=True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)

# Update Delete Classwork Submission
class UpdateDeleteClassworkSubmission(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsStudent| IsTeacher]
    def get(self, request, submission_id):
        submission = services.get_submission_data(submission_id=submission_id)
        serializer = ClassworkSubmissionSerializer(submission)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, submission_id):
        data = services.delete_classwork_submission(user=request.user, submission_id=submission_id)
        return response.Response(data=data, status=status.HTTP_200_OK)
    
# Create Retrieve Classwork Public Comment
class CreateRetrieveClassworkPublicComment(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsTeacher | IsStudent]
    def post(self, request, classwork_id):
        serializer = ClassworkCommentSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.create_public_comment(user= request.user, classwork_id= classwork_id, public_comment_dc= data)
        return response.Response(data=serializer.data)
    
    def get(self, request, classwork_id):
        comments = services.get_public_comments(classwork_id= classwork_id)
        serializer = ClassworkCommentSerializer(comments, many=True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
    
# Create Retrieve Classwork Private Comment
class CreateRetrieveClassworkPrivateComment(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsTeacher | IsStudent]
    def post(self, request, classwork_id, profile_uid):
        serializer = ClassworkPrivateCommentSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.create_private_comment(user= profile_uid, classwork_id= classwork_id, private_comment_dc= data)
        return response.Response(data=serializer.data)
    
    def get(self, request, classwork_id, profile_uid):
        comments = services.get_private_comments(user= profile_uid, classwork_id= classwork_id)
        serializer = ClassworkPrivateCommentSerializer(comments, many=True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)

    
class UpdateClassworkPrivateComment(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsTeacher]  # Only teachers can update comments

    def patch(self, request, comment_id):
        serializer = ClassworkPrivateCommentSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            services.update_private_comment(
                user= request.user,
                comment_id=comment_id,
                private_comment_dc=data
            )
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        return response.Response(serializer.errors, status=400)