from django.urls import path

from .views import StudentDetailView, StudentListCreateView


urlpatterns = [
    path("createview", StudentListCreateView.as_view()),
    path("reviews/<int:student_id>",StudentDetailView.as_view()),

]    