from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from users.permissions import IsTeacher, IsStudent
from users.authentication import Authentication
from .models import Exam, ExamSubmission
from classrooms.models import Classroom
from profiles.models import TeacherProfile
from . import services
from .serializers import ExamSerializer, ExamUpdateSerializer, ExamPublishSerializer, ExamSubmissionSerializer

class ExamCreateView(APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsTeacher]
    def post(self, request, *args, **kwargs):
        serializer = ExamSerializer(data=request.data)
        if serializer.is_valid():
            classroom_id = request.data.get('classroom')
            classroom = get_object_or_404(Classroom, class_id=classroom_id)
            teacher_id = request.data.get('teacher')
            teacher = get_object_or_404(TeacherProfile, profile_uid=teacher_id)

            serializer.save(classroom=classroom, teacher=teacher)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    

class ExamListByClassroomView(APIView):
    def get(self, request, classroom_id, *args, **kwargs):
        exams = Exam.objects.filter(classroom__class_id=classroom_id)
        serializer = ExamSerializer(exams, many=True)
        return Response(serializer.data)
    

class ExamDetailView(APIView):
    def get(self, request, exam_id, *args, **kwargs):
        exam = get_object_or_404(Exam, id=exam_id)
        serializer = ExamSerializer(exam)
        return Response(serializer.data)
        
    def put(self, request, exam_id, *args, **kwargs):
        exam = get_object_or_404(Exam, id=exam_id)
        serializer = ExamUpdateSerializer(exam, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
class ExamPublishView(APIView):
    def put(self, request, exam_id, *args, **kwargs):
        exam = get_object_or_404(Exam, id=exam_id)
        serializer = ExamPublishSerializer(exam, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Exam Submission View
class ExamSubmissionView(APIView):
    authentication_classes = [Authentication]
    permission_classes = [ IsTeacher | IsStudent]
    def get(self, request, exam_id):
        submission = services.get_submission(exam_id=exam_id)
        serializer = ExamSubmissionSerializer(submission, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, exam_id):
        serializer = ExamSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.submit_exam(user=request.user, exam_id=exam_id, exam_submission_dc=data)
        return Response(data=serializer.data, status=status.HTTP_200_OK)