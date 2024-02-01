import dataclasses
import datetime
from typing import TYPE_CHECKING
from .models import Admin, Staff, Teacher, Student
import jwt
from django.conf import settings

if TYPE_CHECKING:
    from .models import Admin, Staff, Teacher, Student


# User Dataclasses
@dataclasses.dataclass
class AdminDataClass:
    username: str
    user_type: str = "admin"
    password: str = None
    uid: int = None
    id: int = None

    @classmethod
    def from_instance(cls, user: "Admin") -> "AdminDataClass":
        return cls( 
            username = user.username,
            uid = user.uid,
            id = user.id
        )
    
@dataclasses.dataclass
class StaffDataClass:
    username:str
    user_type:str = "staff"
    password: str = None
    uid: int = None
    id: int = None

    @classmethod
    def from_instance(cls, user: "Staff") -> "StaffDataClass":
        return cls(
            username = user.username,
            uid = user.uid,
            id = user.id
        )
    
@dataclasses.dataclass
class TeacherDataClass:
    username:str
    user_type: str = "teacher"
    password: str = None
    uid: int = None
    id: int = None

    @classmethod
    def from_instance(cls, user: "Teacher") -> "TeacherDataClass":
        return cls(
            username = user.username,
            uid = user.uid,
            id = user.id
        )
    

@dataclasses.dataclass
class StudentDataClass:
    username:str
    user_type:str = "student"
    password: str = None
    uid: int = None
    id: int = None

    @classmethod
    def from_instance(cls, user: "Student") -> "StudentDataClass":
        return cls(
            username = user.username,
            uid = user.uid,
            id = user.id
        )


# Create User
def create_admin(admin_dc: "AdminDataClass") -> "AdminDataClass":
    instance  = Admin(
        uid = Admin.objects.create_admin_id(),
        username = admin_dc.username,
    )
    if admin_dc.password is not None:
        instance.set_password(admin_dc.password)

    instance.save()
    return AdminDataClass.from_instance(instance)

def create_staff(staff_dc: "StaffDataClass") -> "StaffDataClass":
    instance = Staff(
        uid = Staff.objects.create_staff_id(),
        username = staff_dc.username,
    )
    if staff_dc.password is not None:
        instance.set_password(staff_dc.password)
    
    instance.save()
    return StaffDataClass.from_instance(instance)

def create_teacher(teacher_dc: "TeacherDataClass") -> "TeacherDataClass":
    instance = Teacher(
        uid = Teacher.objects.create_teacher_id(),
        username = teacher_dc.username,
    )
    if teacher_dc.password is not None:
        instance.set_password(teacher_dc.password)
    
    instance.save()
    return TeacherDataClass.from_instance(instance)

def create_student(student_dc: "StudentDataClass") -> "StudentDataClass":
    instance = Student(
        uid = Student.objects.create_student_id(),
        username = student_dc.username,
    )
    if student_dc.password is not None:
        instance.set_password(student_dc.password)
    
    instance.save()
    return StudentDataClass.from_instance(instance)



# User Selector
def admin_selector(uid: str) -> "Admin":
    user = Admin.objects.filter(uid=uid).first()
    return user

def staff_selector(uid: str) -> "Staff":
    user = Staff.objects.filter(uid=uid).first()
    return user

def teacher_selector(uid: str) -> "Teacher":
    user = Teacher.objects.filter(uid=uid).first()
    return user

def student_selector(uid: str) -> "Student":
    user = Student.objects.filter(uid=uid).first()
    return user


# Create Token
def create_token(user_id: int, user_type: str) -> str:
    payload = dict(
        id = user_id,
        user_type = user_type,
        exp = datetime.datetime.utcnow() + datetime.timedelta(hours=24),
        iat = datetime.datetime.utcnow()
    )
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")
    return token