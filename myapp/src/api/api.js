import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3505",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error) {
      console.log(error);
    }
    return Promise.resolve();
  }
);

export default api;
