# Design Document

## 1. Architecture

The application uses a simple full-stack architecture:

React Frontend
↓
Axios HTTP Requests
↓
Django REST Framework API
↓
Django ORM
↓
SQLite Database

The frontend is responsible for the user interface and sending API requests.

The Django REST Framework backend is responsible for business logic, validation, API responses, and database operations.

## 2. Backend Design

The backend is built using Django and Django REST Framework.

### Models

The `Student` model represents student records in the database.

It contains:

- First name
- Last name
- Email
- Date of birth
- Enrollment status
- Created timestamp
- Updated timestamp

Django ORM is used for database operations instead of writing raw SQL.

### Serializers

Django REST Framework serializers are used to:

- Convert model objects into JSON
- Convert incoming JSON into validated data
- Perform input validation

### Views

The API views handle the CRUD operations:

- Create student
- List students
- Retrieve a student
- Update a student
- Delete a student

The views also handle filtering, pagination, and appropriate HTTP responses.

### URLs

The URL configuration maps API endpoints to the corresponding views.

The main API endpoints are:

- `POST /students/`
- `GET /students/`
- `GET /students/{id}`
- `PUT /students/{id}`
- `DELETE /students/{id}`

## 3. Frontend Design

The frontend is built using React.

### Components

The main application displays the student list and provides controls for:

- Adding students
- Editing students
- Deleting students
- Filtering students
- Pagination

A reusable student form is used for both creating and editing students.

### API Layer

Axios is used to communicate with the Django REST API.

API functions are kept separately in:

frontend/src/api/Api.js

This keeps HTTP request logic separate from the React UI components.


### Styling

Tailwind CSS is used for styling the frontend.
It provides utility classes for layout, spacing, typography, buttons, forms, tables, and responsive design.

## 4. Validation Design

Validation is primarily handled by the backend so that the API remains reliable regardless of which client sends the request.

The backend validates:

- Required first name
- Required last name
- Required email
- Valid email format
- Unique email
- Required date of birth
- Date of birth cannot be in the future
- Valid enrollment status
The frontend displays the validation errors returned by the API.

## 5. Pagination and Filtering

The student list endpoint supports pagination.

The backend returns pagination information including:
- count
- next
- previous
- results

The frontend uses the next and previous URLs returned by the API to navigate between pages.

Enrollment status filtering is performed through a query parameter:
/students/?enrollment_status=active


## 6. Error Handling

The API uses standard HTTP status codes.

Examples:
- 200 OK for successful requests
- 201 Created when a student is created
- 400 Bad Request for validation errors
- 404 Not Found when a student does not exist
- 409 Conflict when an email already exists
Error responses use JSON so that the frontend can display meaningful messages to the user.

## 7. Testing Strategy

Automated API tests are implemented using Django REST Framework's APITestCase.

The tests cover:
- Successful student creation
- Invalid date of birth
- Duplicate email
- Enrollment-status filtering
- Student not found
Manual testing was also performed through the React interface and Postman.


## 8. Design Decisions

### Why Django REST Framework?

Django REST Framework was selected because it provides:
- Serializers
- Validation
- Class-based API views
- Pagination
- Standard HTTP responses
- Easy integration with Django ORM
This allowed the API to be implemented without unnecessary complexity.

### Why SQLite?

SQLite was selected because it was explicitly suitable for the assignment and requires no separate database server.
It also makes local setup quick and simple.

### Why React?

React was selected for the frontend because it is familiar, component-based, and suitable for building the required CRUD interface.

### Why Tailwind CSS?

Tailwind CSS was used to create a clean and responsive interface without adding unnecessary UI dependencies.

## 9. Scope

The implementation intentionally focuses on the requirements of the assignment.

Features such as authentication, authorization, advanced search, sorting, and production deployment were not included because they were outside the required scope.

```text
