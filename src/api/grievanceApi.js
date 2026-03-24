import axios from "./axiosConfig";

export async function fetchMyGrievances() {
  const response = await axios.get("/grievances");
  return response.data;
}

export async function submitGrievance(payload, attachment) {
  if (attachment) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => formData.append(key, value));
    formData.append("file", attachment);
    const response = await axios.post("/grievances", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  const response = await axios.post("/grievances", payload);
  return response.data;
}
