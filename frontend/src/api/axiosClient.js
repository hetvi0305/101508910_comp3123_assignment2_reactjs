import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3002/api/v1",
});

console.log("AXIOS BASE URL:", axiosClient.defaults.baseURL);

// Attach token to all requests
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosClient;
