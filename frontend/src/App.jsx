import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "./api/Api";
import StudentForm from "./pages/StudentForm";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);

    const response = await getStudents(statusFilter);

    if (response.status === 200) {
      setStudents(response.data.results);
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) {
      return;
    }

    const response = await deleteStudent(id);

    if (response.status === 200) {
      fetchStudents();
    } else {
      alert("Failed to delete student.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [statusFilter]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Student Management System
            </h1>

            <p className="mt-1 text-gray-500">Manage student records</p>
          </div>

          <button
            onClick={() => {
              setEditingStudent(null);
              setShowForm(true);
            }}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            Add Student
          </button>
        </div>

        {(showForm || editingStudent) && (
          <StudentForm
            editingStudent={editingStudent}
            onStudentCreated={() => {
              setShowForm(false);
              fetchStudents();
            }}
            onStudentUpdated={() => {
              setEditingStudent(null);
              fetchStudents();
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingStudent(null);
            }}
          />
        )}

        <div className="mb-4 rounded-lg bg-white p-4 shadow">
          <label className="mr-3 font-medium text-gray-700">
            Filter by status:
          </label>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2"
          >
            <option value="">All Students</option>
            <option value="active">Active</option>
            <option value="graduated">Graduated</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading students...</p>
        ) : (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Date of Birth</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-t border-gray-200">
                    <td className="px-6 py-4">{student.id}</td>

                    <td className="px-6 py-4 font-medium">
                      {student.first_name} {student.last_name}
                    </td>

                    <td className="px-6 py-4">{student.email}</td>

                    <td className="px-6 py-4">{student.date_of_birth}</td>

                    <td className="px-6 py-4">{student.enrollment_status}</td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => setEditingStudent(student)}
                        className="mr-3 text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
