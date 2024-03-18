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
    students = models.ManyToManyField(StudentProfile, verbose_name="Assigned Students", related_name="classworks")

    objects = ClassworkManager()
    
    def __str__(self):
        return self.title
    

def classwork_submission_file_path(instance, filename):
    # Generate a folder path based on the classwork title
    classwork_title = instance.classwork.title
    return f"classwork_submissions/{classwork_title}/{filename}"

# Classwork Submission Model
class ClassworkSubmission(models.Model):
    submission_id = models.CharField(max_length=20,unique=True,verbose_name="Submission")
    classwork = models.ForeignKey(Classwork, on_delete=models.CASCADE, verbose_name="Classwork", related_name="submissions")
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, verbose_name="Student", related_name="submissions")
    submission_time = models.DateTimeField(auto_now_add=True, verbose_name="Submission Time")
    attachment = models.FileField(upload_to=classwork_submission_file_path, null=True, blank=True, verbose_name="File Upload")
    submission_text = models.TextField(blank=True, null=True, verbose_name="Submission Text")

    def save(self, *args, **kwargs):
        if not self.submission_id:
            current_time = timezone.now()
            unique_number = self.__class__.objects.count() + 1
            self.submission_id = f"SUBMISSION-{current_time.strftime('%Y')}-{unique_number:04d}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student} - {self.classwork.title} Submission"