from rest_framework import serializers
from profiles.models import StaffProfile, TeacherProfile, StudentProfile
from .services import CreateClassworkDataClass, ClassworkDataClass

class TeacherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = '__all__'

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'

class ClassworkSerializer(serializers.Serializer):
    title = serializers.CharField(read_only=True)
    description = serializers.CharField(read_only=True)
    due_date = serializers.DateTimeField(read_only=True)
    teacher = TeacherProfileSerializer(read_only=True)
    classroom = serializers.CharField(read_only=True)
    students = StudentProfileSerializer(many=True, read_only=True)
    classwork_id = serializers.CharField(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return ClassworkDataClass(**data)
    
class CreateClassworkSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()
    due_date = serializers.DateTimeField()
    teacher = serializers.CharField(read_only=True)
    classroom = serializers.CharField()
    classwork_id = serializers.CharField(required=False)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return CreateClassworkDataClass(**data)