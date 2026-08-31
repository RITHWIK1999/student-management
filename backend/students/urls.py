from django.urls import path

from .views import StudentListCreateView


urlpatterns = [
    path("createview", StudentListCreateView.as_view()),

]    