import axios from "../axios";

const handleLoginAPI = (emailInput, passwordInput) => {
    return axios.post("/api/login", {
        email: emailInput,
        password: passwordInput
    });
}

const getAllUsersAPI = () => {
    return axios.get("/api/get-all-users");
}

const createNewUserAPI = (data) => {
    return axios.post("/api/create-new-user", data);
}

const deleteUserAPI = (userId) => {
    return axios.delete("/api/delete-user", {
        data: {
            id: userId
        }
    });
}
const editUserAPI = (data) => {
    return axios.put("/api/edit-user", data);
}

const getAllCodesAPI = (data) => {
    return axios.get("/api/get-all-codes",
        { params: { type: data } });
}

const getTopDoctorsHomeAPI = (limitInput) => {
    return axios.get("/api/top-doctors-home",
        { params: { limit: limitInput } });
}

const getAllDoctorsAPI = () => {
    return axios.get("/api/get-all-doctors");
}

const saveDoctorInforAPI = (data) => {
    return axios.post("/api/save-doctor-information", data);
}

const getDetailDoctorAPI = (doctorId) => {
    return axios.get("/api/get-detail-doctor-by-id",
        { params: { id: doctorId } });

}

const saveBulkScheduleAPI = (dataInput) => {
    return axios.post("/api/bulk-create-schedule", dataInput);
}

const getDoctorScheduleByIdAndDateAPI = (doctorId, date) => {
    return axios.get("/api/get-doctor-schedule-by-id-and-date",
        { params: { doctorId: doctorId, date: date } });

}


export {
    handleLoginAPI,
    getAllUsersAPI,
    createNewUserAPI,
    deleteUserAPI,
    editUserAPI,
    getAllCodesAPI,
    getTopDoctorsHomeAPI,
    getAllDoctorsAPI,
    saveDoctorInforAPI,
    getDetailDoctorAPI,
    saveBulkScheduleAPI,
    getDoctorScheduleByIdAndDateAPI
};