import axiosClient from "./axiosClient";

export const authApi = {
    signup: (data) => axiosClient.post("/user/signup", data),
    login: (data) => axiosClient.post("/user/login", data),
};
