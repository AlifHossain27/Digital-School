import dataclasses
from typing import TYPE_CHECKING
from .models import Classwork, ClassworkSubmission, ClassworkPublicComment, ClassworkPrivateComment
from users.models import Staff, Teacher, Student
from profiles.models import TeacherProfile, StudentProfile
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
    total_points: int 
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
            total_points = classwork_model.total_points,
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
    total_points: int
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
            total_points = classwork_model.total_points,
            classwork_id = classwork_model.classwork_id,
            id = classwork_model.id
        )
    
# Classwork Submission Dataclass
@dataclasses.dataclass
class ClassworkSubmissionDataClass:
    classwork: str
    obtained_points: int
    student: str = None
    turn_in: bool = False
    attachment: any = None
    attachment_name: str = None
    attachment_size: str = None
    submission_id: str = None
    id: int = None

    @classmethod
    def from_instance(cls, classwork_submission_model: "ClassworkSubmission"):
        return cls(
            classwork = classwork_submission_model.classwork,
            student = classwork_submission_model.student,
            turn_in = classwork_submission_model.turn_in,
            attachment = classwork_submission_model.attachment,
            obtained_points = classwork_submission_model.obtained_points,
            submission_id = classwork_submission_model.submission_id,
            id = classwork_submission_model.id
        )
# Create Update Classwork Submission Dataclass
@dataclasses.dataclass
class CreateUpdateClassworkSubmissionDataClass:
    classwork: str
    student: str = None
    turn_in: bool = False
    attachment: any = None
    id: int = None

    @classmethod
    def from_instance(cls, classwork_submission_model: "ClassworkSubmission"):
        return cls(
            classwork = classwork_submission_model.classwork,
            student = classwork_submission_model.student,
            turn_in = classwork_submission_model.turn_in,
            attachment = classwork_submission_model.attachment,
            id = classwork_submission_model.id
        )
    
# Classwork Submission Grade
@dataclasses.dataclass
class UpdateClassworkSubmissionGradeDataClass:
    obtained_points: int
    id: int = None
    
    @classmethod
    def from_instance(cls, classwork_submission_model: "ClassworkSubmission"):
        return cls(
            obtained_points = classwork_submission_model.obtained_points,
            id = classwork_submission_model.id
        )
    
# Classwork Comment
@dataclasses.dataclass
class CommentDataClass:
    text: str
    user_type: str = None
    classwork: str = None
    teacher: str = None
    student: str = None
    created_at: str = None
    id: int = None

    @classmethod
    def from_instance(cls, classwork_public_comment_model: "ClassworkPublicComment"):
        return cls(
            classwork = classwork_public_comment_model.classwork,
            teacher = classwork_public_comment_model.teacher,
            student = classwork_public_comment_model.student,
            user_type = classwork_public_comment_model.user_type,
            text = classwork_public_comment_model.text,
            created_at = classwork_public_comment_model.created_at,
            id = classwork_public_comment_model.id
        )

# Classwork Private Comment
@dataclasses.dataclass
class PrivateCommentDataClass:
    text: str = None
    reply: str = None
    classwork: str = None
    teacher: str = None
    student: str = None
    created_at: str = None
    id: int = None

    @classmethod
    def from_instance(cls, classwork_private_comment_model: "ClassworkPrivateComment"):
        return cls(
            classwork = classwork_private_comment_model.classwork,
            teacher = classwork_private_comment_model.teacher,
            student = classwork_private_comment_model.student,
            text = classwork_private_comment_model.text,
            reply = classwork_private_comment_model.reply,
            created_at = classwork_private_comment_model.created_at,
            id = classwork_private_comment_model.id
        )
    
# Create Classwork
def create_classwork(user: "TeacherProfile", classwork_dc: "CreateUpdateClassworkDataClass") -> "CreateUpdateClassworkDataClass":
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
        total_points = classwork_dc.total_points,
        classwork_id = Classwork.objects.create_classwork_id()
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
def update_classwork(user: "TeacherProfile",classwork_id: str, classwork_dc: "CreateUpdateClassworkDataClass") -> CreateUpdateClassworkDataClass:
    classwork = get_object_or_404(Classwork, classwork_id=classwork_id)
    teacher = get_object_or_404(TeacherProfile, profile_uid= user.uid)
    if teacher != classwork.teacher:
        raise exceptions.PermissionDenied("You're not in the Classroom")
    
    classwork.title = classwork_dc.title
    classwork.description = classwork_dc.description
    classwork.due_date = classwork_dc.due_date
    classwork.teacher = teacher
    classwork.classroom = get_object_or_404(Classroom, class_id = classwork_dc.classroom)
    classwork.total_points = classwork_dc.total_points
    classwork.classwork_id = classwork.classwork_id
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
        turn_in = classwork_submission_dc.turn_in,
        attachment = classwork_submission_dc.attachment,
        submission_id = ClassworkSubmission.objects.create_submission_id()
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

def get_submission_data(submission_id: str) -> ClassworkSubmissionDataClass:
    submission = get_object_or_404(ClassworkSubmission, submission_id=submission_id)
    return ClassworkSubmissionDataClass.from_instance(submission)

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

# Update Classwork Submission Grade
def update_grade(submission_id: str, grade_dc: "UpdateClassworkSubmissionGradeDataClass") -> "UpdateClassworkSubmissionGradeDataClass":
    submission = get_object_or_404(ClassworkSubmission, submission_id=submission_id)
    submission.obtained_points = grade_dc.obtained_points
    submission.save()
    return UpdateClassworkSubmissionGradeDataClass.from_instance(submission)

# Create Public Comment
def create_public_comment(user, classwork_id: str, public_comment_dc: "CommentDataClass") -> "CommentDataClass":
    classwork = get_object_or_404(Classwork, classwork_id=classwork_id)
    if user.uid.startswith('S-'):
        author = get_object_or_404(StudentProfile, profile_uid=user.uid)
        instance = ClassworkPublicComment(
            classwork = classwork,
            student = author,
            user_type = "student",
            text = public_comment_dc.text
        )
        instance.save()
    if user.uid.startswith('T-'):
        author = get_object_or_404(TeacherProfile, profile_uid=user.uid)
        instance = ClassworkPublicComment(
            classwork = classwork,
            teacher = author,
            user_type = "teacher",
            text = public_comment_dc.text
        )
        instance.save()
    
    return CommentDataClass.from_instance(instance)

# Retrieve all Public Comment
def get_public_comments(classwork_id: str) -> "CommentDataClass":
    classwork = get_object_or_404(Classwork, classwork_id=classwork_id)
    public_comments = ClassworkPublicComment.objects.filter(classwork_id=classwork)

    return [CommentDataClass.from_instance(public_comment) for public_comment in public_comments]

# Create Private Comment
def create_private_comment(user: str, classwork_id: str, private_comment_dc: "PrivateCommentDataClass") -> PrivateCommentDataClass:
    classwork = get_object_or_404(Classwork, classwork_id=classwork_id)
    author = get_object_or_404(StudentProfile, profile_uid=user)
    instance = ClassworkPrivateComment(
        classwork = classwork,
        student = author,
        text = private_comment_dc.text
    )
    instance.save()
    return PrivateCommentDataClass.from_instance(instance)

# Retrieve all Private Comment
def get_private_comments(user: str, classwork_id: str) -> PrivateCommentDataClass:
    classwork = get_object_or_404(Classwork, classwork_id=classwork_id)
    student = get_object_or_404(StudentProfile, profile_uid=user)
    private_comments = ClassworkPrivateComment.objects.filter(classwork=classwork, student=student)
    return [PrivateCommentDataClass.from_instance(private_comment) for private_comment in private_comments]

# Update Private Comment
def update_private_comment(user, comment_id: int, private_comment_dc: "PrivateCommentDataClass") -> PrivateCommentDataClass:
    instance = get_object_or_404(ClassworkPrivateComment, id=comment_id)
    instance.teacher = get_object_or_404(TeacherProfile, profile_uid=user.uid)
    instance.reply = private_comment_dc.reply
    instance.save()
    return PrivateCommentDataClass.from_instance(instance)