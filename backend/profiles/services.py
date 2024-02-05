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
def staff_profile_detail(profile_uid: str) -> "StaffProfileDataClass":
    profile = get_object_or_404(StaffProfile, profile_uid = profile_uid)
    return StaffProfileDataClass.from_instance(profile_model=profile)

def teacher_profile_detail(profile_uid: str) -> "TeacherProfileDataClass":
    profile = get_object_or_404(TeacherProfile, profile_uid = profile_uid)
    return TeacherProfileDataClass.from_instance(profile_model=profile)

def student_profile_detail(profile_uid: str) -> "StudentProfileDataClass":
    profile = get_object_or_404(StudentProfile, profile_uid = profile_uid)
    return StudentProfileDataClass.from_instance(profile_model=profile)

# Update Profile
def update_staff_profile(user: "Staff", profile_uid: str, profile_data: "StaffProfileDataClass"):
    profile = get_object_or_404(StaffProfile, profile_uid=profile_uid)
    try:
        if profile.profile_uid != user.uid:
            raise PermissionDenied("You do not have permission to update this profile.")
    except:
        raise PermissionDenied("You do not have permission to update this profile.")

    profile.full_name = profile_data.full_name
    profile.first_name = profile_data.first_name
    profile.last_name = profile_data.last_name
    profile.email = profile_data.email
    profile.contact_info = profile_data.contact_info
    profile.permanent_address = profile_data.permanent_address
    profile.present_address = profile_data.present_address
    profile.date_of_birth = profile_data.date_of_birth

    profile.save()
    return StaffProfileDataClass.from_instance(profile_model = profile)

def update_teacher_profile(user: "Teacher", profile_uid: str, profile_data: "TeacherProfileDataClass"):
    profile = get_object_or_404(TeacherProfile, profile_uid=profile_uid)
    try:
        if profile.profile_uid != user.uid:
            raise PermissionDenied("You do not have permission to update this profile.")
    except:
        raise PermissionDenied("You do not have permission to update this profile.")

    profile.full_name = profile_data.full_name
    profile.first_name = profile_data.first_name
    profile.last_name = profile_data.last_name
    profile.email = profile_data.email
    profile.contact_info = profile_data.contact_info
    profile.permanent_address = profile_data.permanent_address
    profile.present_address = profile_data.present_address
    profile.date_of_birth = profile_data.date_of_birth

    profile.save()
    return TeacherProfileDataClass.from_instance(profile_model = profile)

def update_student_profile(user: "Student", profile_uid: str, profile_data: "StudentProfileDataClass"):
    profile = get_object_or_404(StudentProfile, profile_uid=profile_uid)
    try:
        if profile.profile_uid != user.uid:
            raise PermissionDenied("You do not have permission to update this profile.")
    except:
        raise PermissionDenied("You do not have permission to update this profile.")

    profile.full_name = profile_data.full_name
    profile.first_name = profile_data.first_name
    profile.last_name = profile_data.last_name
    profile.father_name = profile_data.father_name
    profile.father_phone = profile_data.father_phone
    profile.mother_name = profile_data.mother_name
    profile.mother_phone = profile_data.mother_phone
    profile.permanent_address = profile_data.permanent_address
    profile.present_address = profile_data.present_address
    profile.date_of_birth = profile_data.date_of_birth

    profile.save()
    return StudentProfileDataClass.from_instance(profile_model = profile)

# Update Profile Picture
def update_staff_profile_picture(user: "Staff", profile_uid: str, profile_data: "StaffProfilePictureDataClass"):
    profile = get_object_or_404(StaffProfile, profile_uid=profile_uid)
    try:
        if profile.profile_uid != user.uid:
            raise PermissionDenied("You do not have permission to update this profile.")
    except:
        raise PermissionDenied("You do not have permission to update this profile.")
    
    profile.profile_picture = profile_data.profile_picture
    profile.save()
    return StaffProfilePictureDataClass.from_instance(profile_model=profile)

def update_teacher_profile_picture(user: "Teacher", profile_uid: str, profile_data: "TeacherProfilePictureDataClass"):
    profile = get_object_or_404(TeacherProfile, profile_uid=profile_uid)
    try:
        if profile.profile_uid != user.uid:
            raise PermissionDenied("You do not have permission to update this profile.")
    except:
        raise PermissionDenied("You do not have permission to update this profile.")
    
    profile.profile_picture = profile_data.profile_picture
    profile.save()
    return TeacherProfilePictureDataClass.from_instance(profile_model=profile)

def update_student_profile_picture(user: "Student", profile_uid: str, profile_data: "StudentProfilePictureDataClass"):
    profile = get_object_or_404(StudentProfile, profile_uid=profile_uid)
    try:
        if profile.profile_uid != user.uid:
            raise PermissionDenied("You do not have permission to update this profile.")
    except:
        raise PermissionDenied("You do not have permission to update this profile.")
    
    profile.profile_picture = profile_data.profile_picture
    profile.save()
    return StudentProfilePictureDataClass.from_instance(profile_model=profile)