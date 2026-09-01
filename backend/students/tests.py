from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Student


class StudentAPITests(APITestCase):

    def setUp(self):
        self.student_data = {
            "first_name": "John",
            "last_name": "Smith",
            "email": "john@example.com",
            "date_of_birth": "2000-05-15",
            "enrollment_status": "active",
        }

    def test_create_student(self):
        response = self.client.post(
            "/students/createview",
            self.student_data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )

        self.assertEqual(
            Student.objects.count(),
            1
        )

        self.assertEqual(
            response.data["email"],
            "john@example.com"
        )

    def test_invalid_date_of_birth(self):
        data = self.student_data.copy()
        data["date_of_birth"] = "2030-01-01"

        response = self.client.post(
            "/students/createview",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST
        )

        self.assertIn(
            "date_of_birth",
            response.data
        )

    def test_student_not_found(self):
        response = self.client.get("/students/createview/9999")

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND
        )

    def test_duplicate_email(self):
        self.client.post(
            "/students/createview",
            self.student_data,
            format="json"
        )

        response = self.client.post(
            "/students/createview",
            self.student_data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_409_CONFLICT
        )

    def test_filter_by_enrollment_status(self):
        self.client.post(
            "/students/createview",
            self.student_data,
            format="json"
        )

        graduated_student = self.student_data.copy()
        graduated_student["email"] = "jane@example.com"
        graduated_student["enrollment_status"] = "graduated"

        self.client.post(
            "/students/createview",
            graduated_student,
            format="json"
        )

        response = self.client.get(
            "/students/createview?enrollment_status=active"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertEqual(
            response.data["count"],
            1
        )


