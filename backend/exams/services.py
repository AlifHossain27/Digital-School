import dataclasses
from .models import Exam, ExamSubmission
from profiles.models import TeacherProfile, StudentProfile
from classrooms.models import Classroom
from rest_framework import response, exceptions, status
from django.http import Http404
from django.shortcuts import get_object_or_404

@dataclasses.dataclass
class ExamSubmissionDataClass:
    student: str = None
    exam: str = None
    created_at: str = None
    content: str = None
    id: int = None

    @classmethod
    def from_instance(cls, exam_submission_model: "ExamSubmission"):
        return cls(
            student = exam_submission_model.student,
            exam = exam_submission_model.exam,
            created_at = exam_submission_model.created_at,
            content = exam_submission_model.content,
            id = exam_submission_model.id
        )
    
def submit_exam(user: "StudentProfile", exam_id: int, exam_submission_dc: "ExamSubmissionDataClass") -> ExamSubmissionDataClass:
    exam = get_object_or_404(Exam, id=exam_id)
    student = get_object_or_404(StudentProfile, profile_uid=user.uid)
    instance = ExamSubmission(
        student = student,
        exam = exam,
        content = exam_submission_dc.content
    )
    instance.save()
    exam.submissions += 1
    exam.save()
    return ExamSubmissionDataClass.from_instance(instance)

def get_submissions(exam_id: int) -> ExamSubmissionDataClass:
    exam = get_object_or_404(Exam, id=exam_id)
    submissions = ExamSubmission.objects.filter(exam=exam)
    return [ExamSubmissionDataClass.from_instance(submission) for submission in submissions]


def get_submission(exam_id: int, id: int) -> ExamSubmissionDataClass:
    submission = get_object_or_404(ExamSubmission, exam_id=exam_id, id=id)
    return ExamSubmissionDataClass.from_instance(submission)