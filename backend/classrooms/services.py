import dataclasses
from typing import TYPE_CHECKING
from .models import Classroom
from users.models import Staff
from profiles.models import StaffProfile, TeacherProfile, StudentProfile
from rest_framework import response, exceptions, status
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied


@dataclasses.dataclass
class ClassroomCreateDataClass:
    name: str
    staff: str 
    class_id:str = None
    id: int = None

    @classmethod
    def from_instance(cls, classroom_model: "Classroom"):
        return cls(
            class_id = classroom_model.class_id,
            name = classroom_model.name,
            staff = classroom_model.staff,
            id = classroom_model.id
        )

@dataclasses.dataclass
class ClassroomDataClass:
    name: str
    staff: str 
    teachers: str = None
    students: str = None
    class_id:str = None
    id: int = None

    @classmethod
    def from_instance(cls, classroom_model: "Classroom"):
        return cls(
            class_id = classroom_model.class_id,
            name = classroom_model.name,
            staff = classroom_model.staff,
            teachers = classroom_model.teachers,
            students = classroom_model.students,
            id = classroom_model.id
        )

# Create Classroom
def create_classroom(classroom_dc: "ClassroomCreateDataClass") -> "ClassroomCreateDataClass":
    instance = Classroom(
        staff = get_object_or_404(StaffProfile, profile_uid = classroom_dc.staff),
        name = classroom_dc.name, 
    )
    instance.save()
    return ClassroomCreateDataClass.from_instance(instance)

# Delete Classroom
def delete_classroom(user: "Staff",class_id: str) -> None:
    classroom = get_object_or_404(Classroom, class_id=class_id)
    if user.uid != classroom.staff.profile_uid:
        raise exceptions.PermissionDenied("You're not the owner of this sale")
    print(user.uid)
    classroom.delete()
    
# Retrieve Individual Classroom
def get_classroom(class_id: str) -> "ClassroomDataClass":
    classroom = get_object_or_404(Classroom, class_id=class_id)
    return ClassroomDataClass.from_instance(classroom_model= classroom)

# Retrieve Classroom List
def get_classrooms(user_type: str, profile_uid: str) -> list['ClassroomDataClass']:
    if user_type == 'staff':
        try:
            staff = StaffProfile.objects.filter(profile_uid=profile_uid).first()
        except StaffProfile.DoesNotExist:
            return response.Response({"detail": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)
        classrooms = Classroom.objects.filter(staff=staff)
        return [ClassroomDataClass.from_instance(classroom) for classroom in classrooms]
    if user_type == 'teacher':
        teacher = get_object_or_404(TeacherProfile, profile_uid=profile_uid)
        classrooms = Classroom.objects.filter(teachers=teacher)
        return [ClassroomDataClass.from_instance(classroom) for classroom in classrooms]
    if user_type == 'student':
        student = get_object_or_404(StudentProfile, profile_uid=profile_uid)
        classrooms = Classroom.objects.filter(students=student)
        return [ClassroomDataClass.from_instance(classroom) for classroom in classrooms]
    return []

# Add Teacher to Classroom
def add_teacher_to_classroom(class_id: str, profile_uid: str) -> "ClassroomDataClass":
    classroom = get_object_or_404(Classroom, class_id=class_id)
    teacher= get_object_or_404(TeacherProfile, profile_uid=profile_uid)
    classroom.teachers.add(teacher)
    return ClassroomDataClass.from_instance(classroom_model= classroom)

# Remove Teacher from Classroom
def remove_teacher_from_classroom(class_id: str, profile_uid: str) -> "ClassroomDataClass":
    classroom = get_object_or_404(Classroom, class_id=class_id)
    teacher= get_object_or_404(TeacherProfile, profile_uid=profile_uid)
    classroom.teachers.remove(teacher)
    return ClassroomDataClass.from_instance(classroom_model= classroom)

# Add Student to Classroom
def add_student_to_classroom(class_id: str, profile_uid: str) -> "ClassroomDataClass":
    classroom = get_object_or_404(Classroom, class_id=class_id)
    student= get_object_or_404(StudentProfile, profile_uid=profile_uid)
    classroom.students.add(student)
    return ClassroomDataClass.from_instance(classroom_model= classroom)

# Remove Student from Classroom
def remove_student_to_classroom(class_id: str, profile_uid: str) -> "ClassroomDataClass":
    classroom = get_object_or_404(Classroom, class_id=class_id)
    student= get_object_or_404(StudentProfile, profile_uid=profile_uid)
    classroom.students.remove(student)
    return ClassroomDataClass.from_instance(classroom_model= classroom)