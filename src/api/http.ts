import axios from "axios";

const API_BASE_URL = "http://91.142.94.183:8080";

export const apiClient = axios.create({
  baseURL: API_BASE_URL
});

export const authHeaders = (token: string | null) =>
  token
    ? { Authorization: `Bearer ${token}` }
    : {};
