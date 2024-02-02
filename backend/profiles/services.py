import dataclasses
from typing import TYPE_CHECKING
from .models import StaffProfile, TeacherProfile, StudentProfile
from users.models import Staff
from rest_framework import exceptions
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied

if TYPE_CHECKING:
    from .models import StaffProfile, TeacherProfile, StudentProfile
    from users.models import Staff, Teacher, Student


# Staff Dataclass
@dataclasses.dataclass
class StaffProfileDataClass:
    profile_uid: str = None
    full_name: str = None
    first_name: str = None
    last_name: str = None
    email: str = None
    contact_info: str = None
    permanent_address: str = None
    present_address: str = None
    date_of_birth: any = None
    profile_picture: any = None
    id: int = None

    @classmethod
    def from_instance(cls, profile_model: "StaffProfile"):
        return cls(
            profile_uid = profile_model.profile_uid,
            full_name = profile_model.full_name,
            first_name = profile_model.first_name,
            last_name = profile_model.last_name,
            email = profile_model.email,
            contact_info = profile_model.contact_info,
            permanent_address = profile_model.permanent_address,
            present_address = profile_model.present_address,
            date_of_birth = profile_model.date_of_birth,
            profile_picture = profile_model.profile_picture,
            id = profile_model.id
        )
    
@dataclasses.dataclass
class StaffProfilePictureDataClass:
    profile_uid: str = None
    profile_picture: any = None
    id: int = None

    @classmethod
    def from_instance(cls, profile_model: "StaffProfile"):
        return cls(
            profile_uid = profile_model.profile_uid,
            profile_picture = profile_model.profile_picture,
            id = profile_model.id
        )
    

# Teacher Dataclass
@dataclasses.dataclass
class TeacherProfileDataClass:
    profile_uid: str = None
    full_name: str = None
    first_name: str = None
    last_name: str = None
    email: str = None
    contact_info: str = None
    permanent_address: str = None
    present_address: str = None
    date_of_birth: any = None
    profile_picture: any = None
    id: int = None

    @classmethod
    def from_instance(cls, profile_model: "TeacherProfile"):
        return cls(
            profile_uid = profile_model.profile_uid,
            full_name = profile_model.full_name,
            first_name = profile_model.first_name,
            last_name = profile_model.last_name,
            email = profile_model.email,
            contact_info = profile_model.contact_info,
            permanent_address = profile_model.permanent_address,
            present_address = profile_model.present_address,
            date_of_birth = profile_model.date_of_birth,
            profile_picture = profile_model.profile_picture,
            id = profile_model.id
        )
    
@dataclasses.dataclass
class TeacherProfilePictureDataClass:
    profile_uid: str = None
    profile_picture: any = None
    id: int = None

    @classmethod
    def from_instance(cls, profile_model: "TeacherProfile"):
        return cls(
            profile_uid = profile_model.profile_uid,
            profile_picture = profile_model.profile_picture,
            id = profile_model.id
        )
    

# Student Dataclass
@dataclasses.dataclass
class StudentProfileDataClass:
    profile_uid: str = None
    full_name: str = None
    first_name: str = None
    last_name: str = None
    father_name: str = None
    father_phone: str = None
    mother_name: str = None
    mother_phone: str = None
    permanent_address: str = None
    present_address: str = None
    date_of_birth: str = None
    profile_picture: any = None
    id: int = None

    @classmethod
    def from_instance(cls, profile_model: "StudentProfile"):
        return cls(
            profile_uid = profile_model.profile_uid,
            full_name = profile_model.full_name,
            first_name = profile_model.first_name,
            last_name = profile_model.last_name,
            father_name = profile_model.father_name,
            father_phone = profile_model.father_phone,
            mother_name = profile_model.mother_name,
            mother_phone = profile_model.mother_phone,
            permanent_address = profile_model.permanent_address,
            present_address = profile_model.present_address,
            date_of_birth = profile_model.date_of_birth,
            profile_picture = profile_model.profile_picture,
            id = profile_model.id
        )
    
@dataclasses.dataclass
class StudentProfilePictureDataClass:
    profile_uid: str = None
    profile_picture: any = None
    id: int = None

    @classmethod
    def from_instance(cls, profile_model: "StudentProfile"):
        return cls(
            profile_uid = profile_model.profile_uid,
            profile_picture = profile_model.profile_picture,
            id = profile_model.id
        )


# Profile List  
def staff_profile_list() -> list["StaffProfileDataClass"]:
    staff_profiles = StaffProfile.objects.all()
    return [StaffProfileDataClass.from_instance(staff) for staff in staff_profiles]

def teacher_profile_list() -> list["TeacherProfileDataClass"]:
    teacher_profiles = TeacherProfile.objects.all()
    return [TeacherProfileDataClass.from_instance(teacher) for teacher in teacher_profiles]

def student_profile_list() -> list["StudentProfileDataClass"]:
    student_profiles = StudentProfile.objects.all()
    return [StudentProfileDataClass.from_instance(student) for student in student_profiles]


# Profile Details
def staff_profile_detail(profile_id: str) -> "StaffProfileDataClass":
    profile = get_object_or_404(StaffProfile, uid = profile_id)
    return StaffProfileDataClass.from_instance(profile_model=profile)

def teacher_profile_detail(profile_id: str) -> "TeacherProfileDataClass":
    profile = get_object_or_404(TeacherProfile, uid = profile_id)
    return TeacherProfileDataClass.from_instance(profile_model=profile)

def student_profile_detail(profile_id: str) -> "StudentProfileDataClass":
    profile = get_object_or_404(StudentProfile, uid = profile_id)
    return StudentProfileDataClass.from_instance(profile_model=profile)