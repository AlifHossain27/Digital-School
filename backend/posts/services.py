import dataclasses
from typing import TYPE_CHECKING
from .models import ClassroomPost
from profiles.models import TeacherProfile, StudentProfile
from classrooms.models import Classroom
from rest_framework import response, exceptions, status
from django.http import Http404
from django.shortcuts import get_object_or_404

# Classroom Posts DataClass
@dataclasses.dataclass
class ClassroomPostDataClass:
    classroom: str
    post: str
    author: int = None
    post_type: str = "general"
    created_at: str = None
    id: int = None

    @classmethod
    def from_instance(cls, post_model: "ClassroomPost"):
        return cls(
            classroom = post_model.classroom,
            author = post_model.author,
            post = post_model.post,
            post_type = post_model.post_type,
            created_at = post_model.created_at,
            id = post_model.id
        )
    

# Get Classroom Posts
def get_posts(class_id: str) -> ClassroomPostDataClass:
    classroom = get_object_or_404(Classroom, class_id = class_id)
    posts = ClassroomPost.objects.filter(classroom = classroom).all()
    
    return [ClassroomPostDataClass.from_instance(post) for post in posts]

# Create Classroom Post
def create_post(user: "TeacherProfile" ,post_dc: "ClassroomPostDataClass") -> ClassroomPostDataClass:
    teacher = get_object_or_404(TeacherProfile, profile_uid=user.uid)
    classroom = get_object_or_404(Classroom,class_id = post_dc.classroom)

    if teacher not in classroom.teachers.all():
        raise exceptions.PermissionDenied("You're not in the Classroom")

    instance = ClassroomPost(
        classroom = classroom,
        author = teacher,
        post = post_dc.post,
        post_type = post_dc.post_type,
    )
    instance.save()
    return ClassroomPostDataClass.from_instance(instance)

# Update Classroom Post
def update_post(user: "TeacherProfile", post_id: int, post_dc: "ClassroomPostDataClass") -> ClassroomPostDataClass:
    teacher = get_object_or_404(TeacherProfile, profile_uid=user.uid)
    classroom = get_object_or_404(Classroom,class_id = post_dc.classroom)

    if teacher not in classroom.teachers.all():
        raise exceptions.PermissionDenied("You're not in the Classroom")
    
    post = get_object_or_404(ClassroomPost, id = post_id)
    post.classroom = classroom
    post.author = teacher
    post.post = post_dc.post
    post.post_type = post_dc.post_type
    post.save()
    return ClassroomPostDataClass.from_instance(post)

# Delete Classroom Post
def del_post(user: "TeacherProfile", post_id: int):
    teacher = get_object_or_404(TeacherProfile, profile_uid=user.uid)
    post = get_object_or_404(ClassroomPost, id = post_id)
    classroom = get_object_or_404(Classroom,class_id = post.classroom.class_id)

    if teacher not in classroom.teachers.all():
        raise exceptions.PermissionDenied("You're not in the Classroom")
    
    post.delete()
    return f"Successfully deleted post {post_id}"
