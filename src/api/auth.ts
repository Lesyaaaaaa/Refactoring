
import axios from "axios";

const API_URL = "http://91.142.94.183:8080/auth";

export interface AuthResponse {
  accessToken: string;
}

export async function registerUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: "MALE" | "FEMALE";
}): Promise<AuthResponse> {
  const response = await axios.post(`${API_URL}/register`, data, {
    headers: { "Content-Type": "application/json" },
  });
  localStorage.setItem("token", response.data.accessToken);
  return response.data;
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const response = await axios.post(`${API_URL}/login`, data, {
    headers: { "Content-Type": "application/json" },
  });
  localStorage.setItem("token", response.data.accessToken);
  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  const token = localStorage.getItem("token");
  return token ? { accessToken: token } : null;
}
