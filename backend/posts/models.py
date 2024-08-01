from django.db import models
from profiles.models import TeacherProfile
from classrooms.models import Classroom

# Classroom Posts model
class ClassroomPost(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    author = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, verbose_name="Post Author")
    post = models.TextField(verbose_name="Classroom Posts")
    created_at = models.DateTimeField(auto_now_add=True)
    post_type = models.CharField(max_length=100, default="general", verbose_name="Post Type")
