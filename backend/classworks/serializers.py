from rest_framework import serializers
from classrooms.models import Classroom
from profiles.models import StaffProfile, TeacherProfile, StudentProfile
from .services import CreateUpdateClassworkDataClass, ClassworkDataClass, CreateUpdateClassworkSubmissionDataClass, ClassworkSubmissionDataClass, CommentDataClass

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

# Classroom Serializer
class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = '__all__'

# Classwork Serializer
class ClassworkSerializer(serializers.Serializer):
    classwork_id = serializers.CharField(read_only=True)
    title = serializers.CharField(read_only=True)
    description = serializers.CharField(read_only=True)
    due_date = serializers.DateTimeField(read_only=True)
    teacher = TeacherProfileSerializer(read_only=True)
    classroom = ClassroomSerializer(read_only=True)

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
    classwork_id = serializers.CharField(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return CreateUpdateClassworkDataClass(**data)
    
# Classwork Submission Serializer
class ClassworkSubmissionSerializer(serializers.Serializer):
    submission_id = serializers.CharField(read_only=True)
    classwork = ClassroomSerializer(read_only=True)
    student = StudentProfileSerializer(read_only=True)
    turn_in = serializers.BooleanField()
    attachment = serializers.FileField()
    attachment_name = serializers.SerializerMethodField()
    attachment_size = serializers.SerializerMethodField()

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
    classwork = serializers.CharField(read_only=True)
    teacher = TeacherProfileSerializer(read_only=True)
    student = StudentProfileSerializer(read_only=True)
    text = serializers.CharField()
    user_type = serializers.CharField(read_only=True)
    created_at = serializers.CharField(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return CommentDataClass(**data)
    