from django.urls import path

from .views import StudentDetailView, StudentListCreateView

urlpatterns = [
    path("", StudentListCreateView.as_view()),
    path("<int:student_id>", StudentDetailView.as_view()),
]