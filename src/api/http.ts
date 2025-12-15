import axios from "axios";

const api = axios.create({
  baseURL: "http://91.142.94.183:8080", 
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
