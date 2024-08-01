from django.db import models
from profiles.models import StaffProfile, TeacherProfile, StudentProfile
from django.utils import timezone

class Classroom(models.Model):
    class_id = models.CharField(max_length=20,unique=True, verbose_name="Class ID")
    name = models.CharField(max_length=100, verbose_name="Classroom Name")
    staff = models.ForeignKey("profiles.StaffProfile", on_delete=models.CASCADE, related_name='classrooms')
    teachers = models.ManyToManyField("profiles.TeacherProfile", related_name='classrooms', blank=True)
    students = models.ManyToManyField("profiles.StudentProfile", related_name='classrooms', blank=True)

    def save(self, *args, **kwargs):
        if not self.class_id:
            current_time = timezone.now()
            try:
                last_classroom = self.latest('id')
                last_id_number = int(last_classroom.class_id.split('-')[-1])
                new_id_number = last_id_number + 1
            except Classroom.DoesNotExist:
                new_id_number = 1
            self.class_id = f"CLASSROOM-{current_time.strftime('%Y')}-{new_id_number:04d}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name