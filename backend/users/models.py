from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password
from profiles.models import StaffProfile, TeacherProfile, StudentProfile

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
    
    def save(self, *args, **kwargs):
        # If staff_id is not set, generate a new one
        if not self.uid:
            self.uid = self.objects.create_staff_id()

        # Call the parent class's save method
        super().save(*args, **kwargs)

        # Create a StaffProfile for the newly created Staff
        StaffProfile.objects.create(
            staff = self,
            profile_uid = self.uid,
            full_name = self.username,
            first_name = "", 
            last_name = "",
            email = "",
            contact_info = "",
            permanent_address = "",
            present_address = "",
            date_of_birth = "",
        )


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
    
    def save(self, *args, **kwargs):
        # If teacher_id is not set, generate a new one
        if not self.uid:
            self.uid = self.objects.create_teacher_id()

        # Call the parent class's save method
        super().save(*args, **kwargs)

        # Create a TeacherProfile for the newly created Teacher
        TeacherProfile.objects.create(
            teacher = self,
            profile_uid = self.uid,
            full_name = self.username,
            first_name = "", 
            last_name = "",
            email = "",
            contact_info = "",
            permanent_address = "",
            present_address = "",
            date_of_birth = "",
        )
    
    
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
    
    def save(self, *args, **kwargs):
        # If student_id is not set, generate a new one
        if not self.uid:
            self.uid = self.objects.create_student_id()

        # Call the parent class's save method
        super().save(*args, **kwargs)

        # Create a StudentProfile for the newly created Student
        StudentProfile.objects.create(
            student = self,
            profile_uid = self.uid,
            full_name = self.username,
            first_name = "",
            last_name = "",
            father_name = "",
            father_phone = "",
            mother_name = "",
            mother_phone = "",
            permanent_address = "",
            present_address = "",
            date_of_birth = ""
        )