from django.urls import path
from .views import ExamCreateView, ExamListByClassroomView, ExamDetailView, ExamPublishView, ExamSubmissionsView, ExamSubmissionView

urlpatterns = [
    path('exam/create/', ExamCreateView.as_view(), name='exam-create'),
    path('exams/<str:classroom_id>/', ExamListByClassroomView.as_view(), name='exam-list-by-classroom'),
    path('exam/<int:exam_id>/', ExamDetailView.as_view(), name='exam-detail'),
    path('exam/<int:exam_id>/publish/', ExamPublishView.as_view(), name='exam-publish'),
    path('exam/<int:exam_id>/submission/', ExamSubmissionsView.as_view(), name='exam-submissions'),
    path('exam/<int:exam_id>/submission/<int:id>/', ExamSubmissionView.as_view(), name='exam-submission'),
]