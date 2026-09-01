import axios from "axios";

const url = "http://127.0.0.1:8000";

export const getStudents = async (statusFilter = "", pageUrl = null) => {
  try {
    const response = pageUrl
      ? await axios.get(pageUrl)
      : await axios.get(`${url}/students/createview`, {
          params: {
            enrollment_status: statusFilter,
          },
        });

    return response;
  } catch (error) {
    return error;
  }
};

export const createStudent = async (data) => {
  try {
    const response = await axios.post(`${url}/students/createview`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getStudent = async (id) => {
  try {
    const response = await axios.get(`${url}/students/reviews/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateStudent = async (id, data) => {
  try {
    const response = await axios.put(`${url}/students/reviews/${id}`, data);

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${url}/students/reviews/${id}`);

    return response;
  } catch (error) {
    return error;
  }
};
