from rest_framework import serializers
from profiles.models import StaffProfile, TeacherProfile, StudentProfile
from .models import Classroom
from .services import ClassroomCreateDataClass, ClassroomDataClass

class StaffProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffProfile
        fields = '__all__'

class TeacherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = '__all__'

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'

class ClassroomCreateSerializer(serializers.Serializer):
    class_id = serializers.CharField(read_only=True)
    staff = serializers.CharField()
    name = serializers.CharField()

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return ClassroomCreateDataClass(**data)
    
class AddRemoveTeacherSerializer(serializers.Serializer):
    class_id = serializers.CharField()
    teachers = serializers.CharField()

class AddRemoveStudentSerializer(serializers.Serializer):
    class_id = serializers.CharField()
    students = serializers.CharField()

class ClassroomSerializer(serializers.Serializer):
    class_id = serializers.CharField(read_only=True)
    name = serializers.CharField(read_only=True)
    staff = StaffProfileSerializer(read_only=True)
    teachers = TeacherProfileSerializer(many=True, read_only=True)
    students = StudentProfileSerializer(many=True, read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return ClassroomDataClass(**data)