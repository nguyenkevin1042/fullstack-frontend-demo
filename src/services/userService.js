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

const getExtraInfoByIdAPI = (doctorId) => {
    return axios.get("/api/get-extra-info-by-id",
        { params: { doctorId: doctorId } });
}

const getProfileDoctorByIdAPI = (doctorId) => {
    return axios.get("/api/get-profile-doctor-by-id",
        { params: { doctorId: doctorId } });

}

const savePatientScheduleAPI = (dataInput) => {
    return axios.post("/api/patient-book-schedule", dataInput);
}

const verifyBookingAPI = (dataInput) => {
    return axios.post("/api/verify-booking", dataInput);
}

const createNewSpecialtyAPI = (dataInput) => {
    return axios.post("/api/create-new-specialty", dataInput);
}

const getAllSpecialtyAPI = () => {
    return axios.get("/api/get-all-specialty");
}

const getDetailSpecialtyByIdAPI = (inputData) => {
    return axios.get("/api/get-detail-specialty-by-id",
        { params: { id: inputData.id, location: inputData.location } }
    );

}


export {
    handleLoginAPI, getAllUsersAPI, createNewUserAPI,
    deleteUserAPI, editUserAPI,
    getAllCodesAPI, getTopDoctorsHomeAPI,
    getAllDoctorsAPI, saveDoctorInforAPI,
    getDetailDoctorAPI, saveBulkScheduleAPI,
    getDoctorScheduleByIdAndDateAPI, getExtraInfoByIdAPI,
    getProfileDoctorByIdAPI, savePatientScheduleAPI,
    verifyBookingAPI, createNewSpecialtyAPI,
    getAllSpecialtyAPI, getDetailSpecialtyByIdAPI
};