from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from users.permissions import IsAdministrator, IsStaff, IsTeacher, IsStudent
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
        

class ExamSubmissionView(APIView):
    def get(self, request, exam_id, *args, **kwargs):
        # Get the exam instance or return a 404 response if not found
        exam = get_object_or_404(Exam, id=exam_id)

        # Get all exam submissions for the specified exam
        submissions = ExamSubmission.objects.filter(exam=exam)
        
        # Serialize the submissions and return the response
        serializer = ExamSubmissionSerializer(submissions, many=True)
        return Response(serializer.data)
    def post(self, request, exam_id, *args, **kwargs):
        # Get the exam instance or return a 404 response if not found
        exam = get_object_or_404(Exam, id=exam_id)

        # Validate and save the submitted content
        serializer = ExamSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(exam=exam)
            # Update the submissions count in the related exam
            exam.submissions += 1
            exam.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)