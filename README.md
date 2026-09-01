# Student Management System

A full-stack Student Management System built as part of a Software Engineer (Python) assignment.

The application allows users to create, view, update, and delete student records, with validation, enrollment-status filtering, and pagination.

## Tech Stack

### Backend

- Python
- Django
- Django REST Framework
- SQLite

### Frontend

- React
- Axios
- Tailwind CSS

## Features

- Create a student
- View all students
- View a single student
- Update student details
- Delete a student
- Filter students by enrollment status
- Paginate student records
- Validate required fields
- Validate email format
- Prevent duplicate email addresses
- Prevent future dates of birth
- Return appropriate HTTP status codes and JSON error messages
- Automated API tests

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/students/` | Create a student |
| GET | `/students/` | List students |
| GET | `/students/{id}` | Get a single student |
| PUT | `/students/{id}` | Update a student |
| DELETE | `/students/{id}` | Delete a student |

### Filtering

Students can be filtered by enrollment status:


GET /students/?enrollment_status=active

Supported values:

- active
- graduated
- dropped

### Pagination

The student list API supports pagination. The API response provides next and previous URLs for navigating between pages.

### Validation

The API validates:
- First name is required
- Last name is required
- Email is required
- Email must have a valid format
- Email must be unique
- Date of birth is required
- Date of birth cannot be in the future
- Enrollment status must be active, graduated, or dropped
- Created and updated timestamps are managed by the server

### HTTP Responses

The API uses appropriate HTTP status codes including:
- 200 OK — successful request
- 201 Created — student successfully created
- 400 Bad Request — validation error
- 404 Not Found — student does not exist
- 409 Conflict — duplicate email

Example duplicate-email response:

{
  "error": "A student with this email already exists."
}
Example not-found response:
{
  "error": "Student not found."
}

### Project Structure

student-management/
│
├── backend/
│   ├── backend/
│   └── students/
│
├── frontend/
│   ├── src/
│   └── ...
│
├── screenshots/
│
├── DESIGN.md
├── README.md
└── .gitignore

### Setup Instructions

1. Clone the repository

git clone https://github.com/RITHWIK1999/student-management.git
cd student-management

2. Backend Setup

Create and activate a virtual environment:
python -m venv venv

Windows PowerShell:
.\venv\Scripts\Activate.ps1

Go to the backend:
cd backend

Install the backend dependencies:
pip install -r requirements.txt

Run migrations:
py manage.py migrate

Start the Django development server:
py manage.py runserver

The backend will run at:
http://127.0.0.1:8000/

3. Frontend Setup

Open another terminal and go to the frontend:
cd frontend

Install dependencies:
npm install

Start the React development server:
npm run dev

Open the URL displayed by Vite in the terminal.


### Running Tests

From the backend directory:
py manage.py test

The project currently includes automated tests covering student creation, validation failure, duplicate email handling, filtering, and not-found behavior.

### Screenshots

The screenshots directory contains examples of the application's required functionality:

- Student list with pagination and filtering
- Successful student creation
- Validation error
- Student not found (404)

### Design

The design decisions and architecture are documented separately in:
DESIGN.md

### AI Usage

AI assistance was used during development, primarily through ChatGPT.

AI was used for:

- Understanding Django and Django REST Framework concepts
- Generating and reviewing code ideas
- Debugging errors
- Improving validation and API behavior
- Reviewing the implementation against the assignment requirements
- Documentation assistance
All generated code was reviewed, tested, and adjusted during development.

### Examples of AI mistakes caught and fixed

1. Delete response status mismatch

An initial frontend implementation expected the DELETE API to return HTTP 204 No Content. The implemented backend returned 200 OK with a JSON success message instead. This caused the frontend to incorrectly treat a successful deletion as a failure.
The issue was identified during manual testing and the frontend was corrected to handle the actual 200 OK response.

2. Validation error response handling

The backend returned Django REST Framework field-level validation errors for some invalid input, such as a future date of birth. The initial frontend error handling did not correctly display these field-level errors and showed a generic error instead.
This was identified during testing and the frontend was updated to handle both general API errors and field-level validation responses.


### Limitations

- Authentication and authorization are not implemented because they were not required for the assignment.
- The application currently uses SQLite for simplicity.
- No production deployment has been configured.
- The UI is intentionally minimal and focused on the assignment requirements.

### Possible Next Steps

- Add authentication and role-based permissions
- Add search and sorting
- Add more comprehensive automated tests
- Add a production database such as PostgreSQL
- Improve UI/UX and accessibility
- Deploy the application

### Author

Rithwik S



```text