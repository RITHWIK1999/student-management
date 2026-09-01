from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Student
from .serializers import StudentSerializer


class StudentListCreateView(APIView):

    def get(self, request):
        students = Student.objects.all()

        enrollment_status = request.query_params.get("enrollment_status")

        if enrollment_status:
            students = students.filter(
                enrollment_status=enrollment_status
            )

        paginator = PageNumberPagination()
        paginator.page_size = 5

        result_page = paginator.paginate_queryset(
            students,
            request
        )

        serializer = StudentSerializer(
            result_page,
            many=True
        )

        return paginator.get_paginated_response(
            serializer.data
        )

    def post(self, request):
        serializer = StudentSerializer(data=request.data)

        if serializer.is_valid():
            student = serializer.save()

            return Response(
                StudentSerializer(student).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    
class StudentDetailView(APIView):

    def get_student(self, student_id):
        try:
            return Student.objects.get(pk=student_id)
        except Student.DoesNotExist:
            return None

    def get(self, request, student_id):
        student = self.get_student(student_id)

        if student is None:
            return Response(
                {"error": "Student not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = StudentSerializer(student)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def put(self, request, student_id):
        student = self.get_student(student_id)

        if student is None:
            return Response(
                {"error": "Student not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = StudentSerializer(
            student,
            data=request.data
        )

        if serializer.is_valid():
            student = serializer.save()

            return Response(
                StudentSerializer(student).data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, student_id):
        student = self.get_student(student_id)

        if student is None:
            return Response(
                {"error": "Student not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        student.delete()

        return Response(
            {"message": "Student deleted successfully."},
            status=status.HTTP_200_OK
        )