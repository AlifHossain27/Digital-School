from rest_framework import serializers
from .models import Exam, ExamSubmission
from .services import ExamSubmissionDataClass
from profiles.models import TeacherProfile, StudentProfile

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):
    teacher = serializers.CharField(source='teacher.profile_uid')
    classroom = serializers.CharField(source='classroom.class_id')
    class Meta:
        model = Exam
        fields = '__all__'
        
class ExamUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['content']
        
class ExamPublishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['published']



class ExamSubmissionSerializer(serializers.Serializer):
    student = StudentProfileSerializer(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    exam = ExamSerializer(read_only=True)
    content = serializers.CharField()

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return ExamSubmissionDataClass(**data)