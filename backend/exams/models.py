from django.db import models
from profiles.models import TeacherProfile, StudentProfile
from classrooms.models import Classroom

class Exam(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, verbose_name="Classroom", related_name="exams")
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, verbose_name="Teacher", related_name="exams")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created at")
    published = models.BooleanField(default=False, verbose_name="Published")
    name = models.CharField(max_length=250)
    description = models.TextField(default= "", verbose_name="Description")
    content = models.TextField(default= "[]", verbose_name="Content")

    visits = models.IntegerField(default=0, verbose_name="Visits")
    submissions = models.IntegerField(default=0, verbose_name="Submissions")


class ExamSubmission(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, verbose_name="Student", related_name="exam_submissions")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created at")
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, verbose_name="Exam")
    content = models.TextField(verbose_name="Content")