import dataclasses
from typing import TYPE_CHECKING
from .models import Classwork, ClassworkSubmission
from users.models import Staff, Teacher, Student
from profiles.models import StaffProfile, TeacherProfile, StudentProfile
from classrooms.models import Classroom
from rest_framework import response, exceptions, status
from django.http import Http404
from django.shortcuts import get_object_or_404

# Classwork Dataclass
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
    
# Create Update Classwork Dataclass
@dataclasses.dataclass
class CreateUpdateClassworkDataClass:
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
    
# Classwork Submission Dataclass
@dataclasses.dataclass
class ClassworkSubmissionDataClass:
    classwork: str
    student: str = None
    submission_text: str = None
    attachment: any = None
    attachment_name: str = None
    attachment_size: str = None
    id: int = None

    @classmethod
    def from_instance(cls, classwork_submission_model: "ClassworkSubmission"):
        return cls(
            classwork = classwork_submission_model.classwork,
            student = classwork_submission_model.student,
            submission_text = classwork_submission_model.submission_text,
            attachment = classwork_submission_model.attachment,
            id = classwork_submission_model.id
        )
# Create Update Classwork Submission Dataclass
@dataclasses.dataclass
class CreateUpdateClassworkSubmissionDataClass:
    classwork: str
    student: str = None
    submission_text: str = None
    attachment: any = None
    id: int = None

    @classmethod
    def from_instance(cls, classwork_submission_model: "ClassworkSubmission"):
        return cls(
            classwork = classwork_submission_model.classwork,
            student = classwork_submission_model.student,
            submission_text = classwork_submission_model.submission_text,
            attachment = classwork_submission_model.attachment,
            id = classwork_submission_model.id
        )

# Create Classwork
def create_classwork(user: "Teacher", classwork_dc: "CreateUpdateClassworkDataClass") -> "CreateUpdateClassworkDataClass":
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
    return CreateUpdateClassworkDataClass.from_instance(instance)

# List Classwork
def classwork_list(class_id: str) -> ClassworkDataClass:
    classroom_id = get_object_or_404(Classroom, class_id= class_id)
    classworks = Classwork.objects.filter(classroom_id= classroom_id)

    return [ClassworkDataClass.from_instance(classwork) for classwork in classworks]

# Retrieve Classwork
def get_classwork(classwork_id: str) -> ClassworkDataClass:
    classwork = get_object_or_404(Classwork, classwork_id=classwork_id)
    return ClassworkDataClass.from_instance(classwork)

# Update Classwork
def update_classwork(user: "Teacher",classwork_id: str, classwork_dc: "CreateUpdateClassworkDataClass") -> CreateUpdateClassworkDataClass:
    classwork = get_object_or_404(Classwork, classwork_id=classwork_id)
    teacher = get_object_or_404(TeacherProfile, profile_uid= user.uid)
    if teacher != classwork.teacher:
        raise exceptions.PermissionDenied("You're not in the Classroom")
    
    classwork.title = classwork_dc.title
    classwork.description = classwork_dc.description
    classwork.due_date = classwork_dc.due_date
    classwork.teacher = teacher
    classwork.classroom = get_object_or_404(Classroom, class_id = classwork_dc.classroom)
    classwork.classwork_id = classwork_dc.classwork_id
    classwork.save()
    return CreateUpdateClassworkDataClass.from_instance(classwork)

# Delete Classwork
def delete_classwork(user: "TeacherProfile", classwork_id: str):
    classwork = get_object_or_404(Classwork, classwork_id=classwork_id)
    teacher = get_object_or_404(TeacherProfile, profile_uid= user.uid)
    if teacher != classwork.teacher:
        raise exceptions.PermissionDenied("You're not in the Classroom")
    classwork.delete()
    return f"Successfully deleted classwork {classwork.title}"

# Create Classwork Submission
def create_classwork_submission(user: "StudentProfile", classwork_id: str, classwork_submission_dc: "CreateUpdateClassworkSubmissionDataClass") ->  CreateUpdateClassworkSubmissionDataClass:
    classwork = get_object_or_404(Classwork, classwork_id=classwork_id)
    classroom = get_object_or_404(Classroom, class_id=classwork.classroom.class_id)
    student = get_object_or_404(StudentProfile, profile_uid=user.uid)
    if student not in classroom.students.all():
        raise exceptions.PermissionDenied("You're not in the Classroom")
    
    instance = ClassworkSubmission(
        classwork = classwork,
        student = student,
        submission_text = classwork_submission_dc.submission_text,
        attachment = classwork_submission_dc.attachment,
    )
    instance.save()
    return CreateUpdateClassworkSubmissionDataClass.from_instance(instance)

# Classwork Submissions List
def get_classwork_submission_list(user ,classroom_id: str, classwork_id: str) -> ClassworkSubmissionDataClass:
    classroom = get_object_or_404(Classroom, class_id=classroom_id)
    if user.uid.startswith('S-'):
        submittor = get_object_or_404(StudentProfile, profile_uid=user.uid)
        if submittor not in classroom.students.all():
            raise exceptions.PermissionDenied("You're not in the Classroom")
    if user.uid.startswith('T-'):
        submittor = get_object_or_404(TeacherProfile, profile_uid=user.uid)
        if submittor not in classroom.teachers.all():
            raise exceptions.PermissionDenied("You're not in the Classroom")
    classwork = get_object_or_404(Classwork, classwork_id=classwork_id)
    submissions = ClassworkSubmission.objects.filter(classwork_id=classwork)
    
    return [ClassworkSubmissionDataClass.from_instance(submission) for submission in submissions]

# Classwork Submission
def get_classwork_submission(user ,classroom_id: str, classwork_id: str) -> ClassworkSubmissionDataClass:
    classroom = get_object_or_404(Classroom, class_id=classroom_id)
    classwork = get_object_or_404(Classwork, classwork_id=classwork_id)
    if user.uid.startswith('S-'):
        submittor = get_object_or_404(StudentProfile, profile_uid=user.uid)
        if submittor not in classroom.students.all():
            raise exceptions.PermissionDenied("You're not in the Classroom")
        submissions = ClassworkSubmission.objects.filter(classwork_id=classwork, student=submittor)
    if user.uid.startswith('T-'):
        raise exceptions.PermissionDenied("You're not allowed")
        
    return [ClassworkSubmissionDataClass.from_instance(submission) for submission in submissions]

def delete_classwork_submission(user ,submission_id: str):
    submission = get_object_or_404(ClassworkSubmission, submission_id=submission_id)
    if user.uid.startswith('S-'):
        submittor = get_object_or_404(StudentProfile, profile_uid=user.uid)
        if submittor != submission.student:
            raise exceptions.PermissionDenied("You're not allowed")
        submission.delete()
    if user.uid.startswith('T-'):
        raise exceptions.PermissionDenied("You're not allowed")
    return f"Successfully deleted classwork submission"