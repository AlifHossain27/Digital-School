import os
from django.db import models

# Profile Picture Upload Path
def staff_profile_picture_path(instance, filename):
    _, extension = os.path.splitext(filename)
    return f"staffs/{instance.staff_id}{extension}"

def teacher_profile_picture_path(instance, filename):
    _, extension = os.path.splitext(filename)
    return f"teachers/{instance.teacher_id}{extension}"

def student_profile_picture_path(instance, filename):
    _, extension = os.path.splitext(filename)
    return f"students/{instance.student_id}{extension}"

# Staff Profile Model
class StaffProfile(models.Model):
    staff = models.OneToOneField('users.Staff', on_delete=models.CASCADE, related_name='profile')
    profile_uid = models.CharField(max_length=20, unique=True, verbose_name="Staff Profile ID")
    full_name = models.CharField(max_length=100, verbose_name="Full name")
    first_name = models.CharField(null=True, blank=True, max_length=50, verbose_name="First Name")
    last_name = models.CharField(null=True, blank=True, max_length=50, verbose_name="Last Name")
    email = models.EmailField(null=True, blank=True, max_length=100, verbose_name="Email Address")
    contact_info = models.CharField(null=True, blank=True, max_length=50, verbose_name="Contact Info")
    permanent_address = models.TextField(null=True, blank=True, max_length=200, verbose_name="Permanent Address")
    present_address = models.TextField(null=True, blank=True, max_length=200, verbose_name="Present Address")
    date_of_birth = models.CharField(null=True, blank=True, max_length=100, verbose_name="Date of Birth")
    profile_picture = models.ImageField(null=True, blank=True, upload_to=staff_profile_picture_path, default="Default.png")

    def save(self, *args, **kwargs):
        if not self.profile_uid and self.staff:
            self.profile_uid = self.staff.uid

        if not self.full_name and self.staff:
            self.full_name = self.staff.username

        super().save(*args, **kwargs)

# Teacher Profile Model
class TeacherProfile(models.Model):
    teacher = models.OneToOneField('users.Teacher', on_delete=models.CASCADE, related_name='profile')
    profile_uid = models.CharField(max_length=20, unique=True, verbose_name="Teacher Profile ID")
    full_name = models.CharField(max_length=100, verbose_name="Full name")
    first_name = models.CharField(null=True, blank=True, max_length=50, verbose_name="First Name")
    last_name = models.CharField(null=True, blank=True, max_length=50, verbose_name="Last Name")
    email = models.EmailField(null=True, blank=True, max_length=100, verbose_name="Email Address")
    contact_info = models.CharField(null=True, blank=True, max_length=50, verbose_name="Contact Info")
    permanent_address = models.TextField(null=True, blank=True, max_length=200, verbose_name="Permanent Address")
    present_address = models.TextField(null=True, blank=True, max_length=200, verbose_name="Present Address")
    date_of_birth = models.CharField(null=True, blank=True, max_length=100, verbose_name="Date of Birth")
    profile_picture = models.ImageField(null=True, blank=True, upload_to=staff_profile_picture_path, default="Default.png")

    def save(self, *args, **kwargs):
        if not self.profile_uid and self.teacher:
            self.profile_uid = self.teacher.uid

        if not self.full_name and self.teacher:
            self.full_name = self.teacher.username

        super().save(*args, **kwargs)

# Student Profile Model
class StudentProfile(models.Model):
    student = models.OneToOneField('users.Student', on_delete=models.CASCADE, verbose_name="Student")
    profile_uid = models.CharField(max_length=20, unique=True, verbose_name="Student Profile ID")
    full_name = models.CharField(max_length=100, verbose_name="Full name")
    first_name = models.CharField(null=True, blank=True, max_length=50, verbose_name="First Name")
    last_name = models.CharField(null=True, blank=True, max_length=50, verbose_name="Last Name")
    father_name = models.CharField(null=True, blank=True, max_length=100, verbose_name="Father's Name")
    father_phone = models.CharField(null=True, blank=True, max_length=50, verbose_name="Father's Contact Info")
    mother_name = models.CharField(null=True, blank=True, max_length=100, verbose_name="Mother's Name")
    mother_phone = models.CharField(null=True, blank=True, max_length=50, verbose_name="Mother's Contact Info")
    permanent_address = models.CharField(null=True, blank=True, max_length=200, verbose_name="Permanent Address")
    present_address = models.CharField(null=True, blank=True, max_length=200, verbose_name="Present Address")
    date_of_birth = models.CharField(null=True, blank=True, max_length=100, verbose_name="Date of Birth")
    profile_picture = models.ImageField(null=True, blank=True, upload_to=student_profile_picture_path, default="Default.png")

    def save(self, *args, **kwargs):
        if not self.profile_uid and self.student:
            self.profile_uid = self.student.uid

        if not self.full_name and self.student:
            self.full_name = self.student.username

        super().save(*args, **kwargs)