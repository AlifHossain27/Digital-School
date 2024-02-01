from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password

# Create Admin ID
class AdminManager(models.Manager):
    def create_admin_id(self, **extra_fields):
        current_time = timezone.now()
        unique_number = self.count() + 1 
        uid = f"A-{current_time.strftime('%Y')}-{unique_number:04d}"
        return uid
    
# Admin Model
class Admin(models.Model):
    uid = models.CharField(max_length=20, unique=True, verbose_name="Admin ID")
    username = models.CharField(max_length=50, unique=True, verbose_name="Username")
    password = models.CharField(max_length=255, verbose_name= "Password")
    created_at = models.DateTimeField(auto_now_add=True)

    objects = AdminManager()

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    
    def is_authenticated(self):
        return True
    

# Create Staff ID
class StaffManager(models.Manager):
    def create_staff_id(self, **extra_fields):
        current_time = timezone.now()
        unique_number = self.count() + 1 
        uid = f"STAFF-{current_time.strftime('%Y')}-{unique_number:04d}"
        return uid

# Staff Model
class Staff(models.Model):
    uid = models.CharField(max_length=20, unique=True, verbose_name="Staff ID")
    username = models.CharField(max_length=50, verbose_name="Username")
    password = models.CharField(max_length=255, verbose_name="Password")
    created_at = models.DateTimeField(auto_now_add=True)

    objects = StaffManager()

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def is_authenticated(self):
        return True


# Create Teacher ID
class TeacherManager(models.Manager):
    def create_teacher_id(self, **extra_fields):
        current_time = timezone.now()
        unique_number = self.count() + 1
        uid = f"T-{current_time.strftime('%Y')}-{unique_number:04d}"
        return uid

# Teacher Model
class Teacher(models.Model):
    uid = models.CharField(max_length=20, unique=True, verbose_name="Teacher ID")
    username = models.CharField(max_length=50, verbose_name="Username")
    password = models.CharField(max_length=255, verbose_name="Password")
    created_at = models.DateTimeField(auto_now_add=True)

    objects = TeacherManager()

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def is_authenticated(self):
        return True 
    
    
# Create Student ID
class StudentManager(models.Manager):
    def create_student_id(self, **extra_fields):
        current_time = timezone.now()
        unique_number = self.count() + 1
        uid = f"S-{current_time.strftime('%Y')}-{unique_number:04d}"
        return uid

# Student Model
class Student(models.Model):
    uid = models.CharField(max_length=20, unique=True, verbose_name="Student ID")
    username = models.CharField(max_length=50, verbose_name="Username")
    password = models.CharField(max_length=255, verbose_name="Password")
    created_at = models.DateTimeField(auto_now_add=True)

    objects = StudentManager()

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def is_authenticated(self):
        return True