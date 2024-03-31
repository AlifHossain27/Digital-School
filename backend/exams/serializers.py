from rest_framework import serializers
from .models import Exam, ExamSubmission

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

class ExamSubmissionSerializer(serializers.ModelSerializer):
    exam = ExamSerializer()
    class Meta:
        model = ExamSubmission
        fields = '__all__'