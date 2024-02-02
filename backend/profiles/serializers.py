from rest_framework import serializers
from .services import StaffProfileDataClass, StaffProfilePictureDataClass, TeacherProfileDataClass, TeacherProfilePictureDataClass, StudentProfileDataClass, StudentProfilePictureDataClass

# Staff Profile Serializer
class StaffProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    profile_uid = serializers.CharField(required=False)
    full_name = serializers.CharField(allow_blank=True)
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    email = serializers.CharField(allow_blank=True)
    contact_info = serializers.CharField(allow_blank=True)
    permanent_address = serializers.CharField(allow_blank=True)
    present_address = serializers.CharField(allow_blank=True)
    date_of_birth = serializers.CharField(allow_blank=True)
    profile_picture = serializers.ImageField(allow_null=True, required=False, read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return StaffProfileDataClass(**data)

# Staff Profile Picture Serializer
class StaffProfilePictureSerializer(serializers.Serializer):
    profile_picture = serializers.ImageField(allow_null=True, required=False, write_only=True)
    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return StaffProfilePictureDataClass(**data)
    

# Teacher Profile Serializer
class TeacherProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    profile_uid = serializers.CharField(required=False)
    full_name = serializers.CharField(allow_blank=True)
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    email = serializers.CharField(allow_blank=True)
    contact_info = serializers.CharField(allow_blank=True)
    permanent_address = serializers.CharField(allow_blank=True)
    present_address = serializers.CharField(allow_blank=True)
    date_of_birth = serializers.CharField(allow_blank=True)
    profile_picture = serializers.ImageField(allow_null=True, required=False, read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return TeacherProfileDataClass(**data)

# Teacher Profile Picture Serializer
class TeacherProfilePictureSerializer(serializers.Serializer):
    profile_picture = serializers.ImageField(allow_null=True, required=False, write_only=True)
    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return TeacherProfilePictureDataClass(**data)
    

# Student Profile Serializer
class StudentProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    profile_uid = serializers.CharField(required=False)
    full_name = serializers.CharField(allow_blank=True)
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    father_name = serializers.CharField(allow_blank=True)
    father_phone = serializers.CharField(allow_blank=True)
    mother_name = serializers.CharField(allow_blank=True)
    mother_phone = serializers.CharField(allow_blank=True)
    permanent_address = serializers.CharField(allow_blank=True)
    present_address = serializers.CharField(allow_blank=True)
    date_of_birth = serializers.CharField(allow_blank=True)
    profile_picture = serializers.ImageField(allow_null=True, required=False)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return StudentProfileDataClass(**data)
    
# Student Profile Picture Serializer
class StudentProfilePictureSerializer(serializers.Serializer):
    profile_picture = serializers.ImageField(allow_null=True, required=False, write_only=True)
    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return StudentProfilePictureDataClass(**data)