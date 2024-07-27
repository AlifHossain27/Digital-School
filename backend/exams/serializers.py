from rest_framework import serializers
from .models import Exam, ExamSubmission, ExamSummary
from .services import ExamSubmissionDataClass
from profiles.models import TeacherProfile, StudentProfile
from classrooms.models import Classroom

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = '__all__'

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):
    teacher = serializers.CharField(source='teacher.profile_uid')
    classroom = ClassroomSerializer(read_only=True)
    class Meta:
        model = Exam
        fields = '__all__'
        
class ExamUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['content', 'totalPoints']
        
class ExamPublishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['published']



class ExamSubmissionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    student = StudentProfileSerializer(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    exam = ExamSerializer(read_only=True)
    content = serializers.CharField()

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return ExamSubmissionDataClass(**data)
    
class ExamSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamSummary
        fields = '__all__'