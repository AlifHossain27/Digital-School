import dataclasses
from typing import TYPE_CHECKING
from .models import Classwork
from users.models import Staff, Teacher, Student
from profiles.models import StaffProfile, TeacherProfile, StudentProfile
from classrooms.models import Classroom
from rest_framework import response, exceptions, status
from django.http import Http404
from django.shortcuts import get_object_or_404

@dataclasses.dataclass
class ClassworkDataClass:
    title: str
    description: str
    due_date: str
    teacher: str
    classroom: str
    students: str = None
    classwork_id: str = None
    id: int = None

    @classmethod
    def from_instance(cls, classwork_model: "Classwork"):
        return cls(
            title = classwork_model.title,
            description = classwork_model.description,
            due_date = classwork_model.due_date,
            teacher = classwork_model.teacher,
            classroom = classwork_model.classroom,
            students = classwork_model.students,
            classwork_id = classwork_model.classwork_id,
            id = classwork_model.id
        )
    
@dataclasses.dataclass
class CreateClassworkDataClass:
    title: str
    description: str
    due_date: str
    classroom: str
    teacher: str = None
    classwork_id: str = None
    id: int = None

    @classmethod
    def from_instance(cls, classwork_model: "Classwork"):
        return cls(
            title = classwork_model.title,
            description = classwork_model.description,
            due_date = classwork_model.due_date,
            teacher = classwork_model.teacher,
            classroom = classwork_model.classroom,
            classwork_id = classwork_model.classwork_id,
            id = classwork_model.id
        )

def create_classwork(user: "Teacher", classwork_dc: "CreateClassworkDataClass") -> "CreateClassworkDataClass":
    classroom_model = get_object_or_404(Classroom, class_id = classwork_dc.classroom)
    teacher_model = get_object_or_404(TeacherProfile, profile_uid = user.uid)
    if teacher_model not in classroom_model.teachers.all():
        raise exceptions.PermissionDenied("You're not in the Classroom")
    
    instance = Classwork(
        title = classwork_dc.title,
        description = classwork_dc.description,
        due_date = classwork_dc.due_date,
        teacher = get_object_or_404(TeacherProfile, profile_uid = user.uid),
        classroom = get_object_or_404(Classroom, class_id = classwork_dc.classroom),
        classwork_id = classwork_dc.classwork_id
    )
    instance.save()
    return CreateClassworkDataClass.from_instance(instance)
