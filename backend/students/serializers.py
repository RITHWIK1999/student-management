from rest_framework import serializers
from .models import Student
from datetime import date


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "date_of_birth",
            "enrollment_status",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]


        def validate_date_of_birth(self, value):
            if value > date.today():
                raise serializers.ValidationError(
                "Date of birth cannot be in the future."
            )

            return value