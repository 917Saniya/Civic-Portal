import axios from "./axiosConfig";

export async function registerUser(payload) {
  const response = await axios.post("/auth/register", payload);
  return response.data;
}

export async function loginUser(payload) {
  const response = await axios.post("/auth/login", payload);
  return response.data;
}
