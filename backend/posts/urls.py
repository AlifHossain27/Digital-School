from django.urls import path
from .views import CreateUpdateClassroomPostView, ClassroomPostView

urlpatterns = [
    path("post/create/", CreateUpdateClassroomPostView.as_view(), name="create-classroom-post"),
    path("post/<int:post_id>/", CreateUpdateClassroomPostView.as_view(), name="update-delete-classroom-post"),
    path("post/classroom/<str:class_id>/", ClassroomPostView.as_view(), name="retrieve-classroom-post"),
]