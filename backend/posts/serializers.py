from rest_framework import serializers
from classrooms.models import Classroom
from profiles.models import TeacherProfile, StudentProfile
from .services import ClassroomPostDataClass

# Teacher Serializer
class TeacherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = '__all__'

# Classroom Serializer
class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = '__all__'

# Classroom Post Serializer
class ClassroomPostSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    classroom =  ClassroomSerializer(read_only=True)
    author = TeacherProfileSerializer(read_only=True)
    post = serializers.CharField(read_only=True)
    created_at = serializers.CharField(read_only=True)
    post_type = serializers.CharField(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return ClassroomPostDataClass(**data)
    
class CreateUpdateClassroomPostSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    classroom =  serializers.CharField()
    author = TeacherProfileSerializer(required=False)
    post = serializers.CharField()
    created_at = serializers.CharField(read_only=True)
    post_type = serializers.CharField(required=False)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return ClassroomPostDataClass(**data)