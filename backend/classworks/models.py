from django.db import models
from django.utils import timezone
from profiles.models import TeacherProfile, StudentProfile
from classrooms.models import Classroom


class ClassworkManager(models.Manager):
    def create_classwork_id(self, **extra_fields):
        current_time = timezone.now()
        unique_number = Classwork.objects.count() + 1
        classwork_id = f"CLASSWORK-{current_time.strftime('%Y')}-{unique_number:04d}"
        return classwork_id
    
# Classwork Model
class Classwork(models.Model):
    classwork_id = models.CharField(max_length=20,unique=True,verbose_name="Classwork")
    title = models.CharField(max_length=100, verbose_name="Title")
    description = models.TextField(verbose_name="Description")
    due_date = models.DateTimeField(verbose_name="Due Date")
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, verbose_name="Assigned Teacher", related_name="classworks")
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, verbose_name="Classroom", related_name="classworks")

    objects = ClassworkManager()
    
    def __str__(self):
        return self.title
    

def classwork_submission_file_path(instance, filename):
    # Generate a folder path based on the classwork title
    classwork_title = instance.classwork.title
    return f"classwork_submissions/{classwork_title}/{filename}"

class ClassworkSubmissionManager(models.Manager):
    def create_submission_id(self, **extra_fields):
        current_time = timezone.now()
        unique_number = ClassworkSubmission.objects.count() + 1
        submission_id = f"SUBMISSION-{current_time.strftime('%Y')}-{unique_number:04d}"
        return submission_id

# Classwork Submission Model
class ClassworkSubmission(models.Model):
    submission_id = models.CharField(max_length=20,unique=True,verbose_name="Submission")
    classwork = models.ForeignKey(Classwork, on_delete=models.CASCADE, verbose_name="Classwork", related_name="submissions")
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, verbose_name="Student", related_name="submissions")
    submission_time = models.DateTimeField(auto_now_add=True, verbose_name="Submission Time")
    attachment = models.FileField(upload_to=classwork_submission_file_path, null=True, blank=True, verbose_name="File Upload")
    turn_in = models.BooleanField(default=False, verbose_name="Turn In")

    objects = ClassworkSubmissionManager()

    def __str__(self):
        return f"{self.student} - {self.classwork.title} Submission"

# Classwork Public Comment 
class ClassworkPublicComment(models.Model):
    classwork = models.ForeignKey(Classwork, on_delete=models.CASCADE, verbose_name="Classwork", related_name="public_comments")
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, blank=True, null=True, verbose_name="Assigned Teacher", related_name="public_comments")
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, blank=True, null=True, verbose_name="Student", related_name="public_comments")
    user_type = models.CharField(max_length=50, blank=True, verbose_name='User Type')
    text = models.TextField(verbose_name="Text")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="created_at")

# Classwork Private Comment
class ClassworkPrivateComment(models.Model):
    classwork = models.ForeignKey(Classwork, on_delete=models.CASCADE, verbose_name="Classwork", related_name="private_comments")
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, blank=True, null=True, verbose_name="Assigned Teacher", related_name="private_comments")
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, blank=True, null=True, verbose_name="Student", related_name="private_comments")
    user_type = models.CharField(max_length=50, blank=True, verbose_name='User Type')
    text = models.TextField(verbose_name="Text")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="created_at")