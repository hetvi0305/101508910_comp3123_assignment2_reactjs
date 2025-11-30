import axiosClient from "./axiosClient";

export const employeeApi = {
    getAll: () => axiosClient.get("/emp/employees"),
    getOne: (id) => axiosClient.get(`/emp/employees/${id}`),

    create: (data, isFormData = false) =>
        axiosClient.post("/emp/employees", data, {
        headers: isFormData
            ? { "Content-Type": "multipart/form-data" }
            : {},
        }),

    update: (id, data, isFormData = false) =>
        axiosClient.put(`/emp/employees/${id}`, data, {
        headers: isFormData
            ? { "Content-Type": "multipart/form-data" }
            : {},
        }),

    remove: (id) => axiosClient.delete(`/emp/employees/${id}`),

    search: (params) => axiosClient.get(`/emp/employees/search`, { params }),
};
