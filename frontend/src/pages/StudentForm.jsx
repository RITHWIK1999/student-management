import { useEffect, useState } from "react";
import { createStudent, updateStudent } from "../api/Api";

function StudentForm({
  onStudentCreated,
  onStudentUpdated,
  onCancel,
  editingStudent,
}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    enrollment_status: "active",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        first_name: editingStudent.first_name,
        last_name: editingStudent.last_name,
        email: editingStudent.email,
        date_of_birth: editingStudent.date_of_birth,
        enrollment_status: editingStudent.enrollment_status,
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    let response;

    if (editingStudent) {
      response = await updateStudent(editingStudent.id, formData);
    } else {
      response = await createStudent(formData);
    }

    if (response.status === 200 || response.status === 201) {
      if (editingStudent) {
        onStudentUpdated();
      } else {
        onStudentCreated();
      }

      return;
    }

    if (response.response?.data) {
      const errors = response.response.data;

      if (errors.error) {
        setError(errors.error);
      } else if (errors.date_of_birth) {
        setError(errors.date_of_birth[0]);
      } else {
        setError("Please check the entered information.");
      }
    } else {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold text-gray-900">
        {editingStudent ? "Edit Student" : "Add Student"}
      </h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Date of Birth
            </label>

            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Enrollment Status
            </label>

            <select
              name="enrollment_status"
              value={formData.enrollment_status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="graduated">Graduated</option>
              <option value="dropped">Dropped</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingStudent
                ? "Update Student"
                : "Create Student"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
