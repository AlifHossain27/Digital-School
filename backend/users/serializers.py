from rest_framework import serializers
from .services import AdminDataClass, StaffDataClass, TeacherDataClass, StudentDataClass

class AdminSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    uid = serializers.CharField(read_only=True)
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    user_type = serializers.CharField(default="admin")


    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return AdminDataClass(**data)
    
class StaffSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    uid = serializers.CharField(read_only=True)
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    user_type = serializers.CharField(default="staff")

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return StaffDataClass(**data)
    
class TeacherSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    uid = serializers.CharField(read_only=True)
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    user_type = serializers.CharField(default="teacher")

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return TeacherDataClass(**data)
    
class StudentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    uid = serializers.CharField(read_only=True)
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    user_type = serializers.CharField(default="student")

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return StudentDataClass(**data)