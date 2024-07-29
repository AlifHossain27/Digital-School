from rest_framework import serializers
from classrooms.models import Classroom
from profiles.models import StaffProfile, TeacherProfile, StudentProfile
from .services import CreateUpdateClassworkDataClass, ClassworkDataClass, CreateUpdateClassworkSubmissionDataClass, ClassworkSubmissionDataClass, CommentDataClass, PrivateCommentDataClass

# Teacher Serializer
class TeacherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = '__all__'

# Student Serializer
class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'


# Classwork Serializer
class ClassworkSerializer(serializers.Serializer):
    classwork_id = serializers.CharField(read_only=True)
    title = serializers.CharField(read_only=True)
    description = serializers.CharField(read_only=True)
    due_date = serializers.DateTimeField(read_only=True)
    teacher = TeacherProfileSerializer(read_only=True)
    classroom = serializers.CharField(read_only=True)
    total_points = serializers.IntegerField(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return ClassworkDataClass(**data)

# Create Update Classwork Serializer   
class CreateUpdateClassworkSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()
    due_date = serializers.DateTimeField()
    teacher = serializers.CharField(read_only=True)
    classroom = serializers.CharField()
    total_points = serializers.IntegerField()
    classwork_id = serializers.CharField(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return CreateUpdateClassworkDataClass(**data)
    
# Classwork Submission Serializer
class ClassworkSubmissionSerializer(serializers.Serializer):
    submission_id = serializers.CharField(read_only=True)
    classwork = serializers.CharField(read_only=True)
    student = StudentProfileSerializer(read_only=True)
    turn_in = serializers.BooleanField(read_only=True)
    attachment = serializers.FileField(read_only=True)
    attachment_name = serializers.SerializerMethodField(read_only=True)
    attachment_size = serializers.SerializerMethodField(read_only=True)
    obtained_points = serializers.IntegerField(read_only=True)

    def get_attachment_name(self, obj):
        return obj.attachment.name if obj.attachment else None

    def get_attachment_size(self, obj):
        return obj.attachment.size if obj.attachment else None

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return ClassworkSubmissionDataClass(**data)

# Create Update Classwork Submission Serializer
class CreateUpdateClassworkSubmissionSerializer(serializers.Serializer):
    classwork = serializers.CharField()
    student = serializers.CharField(read_only=True)
    turn_in = serializers.BooleanField()
    attachment = serializers.FileField()

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return CreateUpdateClassworkSubmissionDataClass(**data)
    
# Classwork Comment
class ClassworkCommentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    classwork = serializers.CharField(read_only=True)
    teacher = TeacherProfileSerializer(read_only=True)
    student = StudentProfileSerializer(read_only=True)
    text = serializers.CharField()
    user_type = serializers.CharField(read_only=True)
    created_at = serializers.CharField(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return CommentDataClass(**data)
    
# Classwork Private Comment
class ClassworkPrivateCommentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    classwork = serializers.CharField(read_only=True)
    teacher = TeacherProfileSerializer(read_only=True)
    student = StudentProfileSerializer(read_only=True)
    text = serializers.CharField(required=False)
    reply = serializers.CharField(required=False)
    created_at = serializers.CharField(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return PrivateCommentDataClass(**data)
    