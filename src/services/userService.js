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


export {
    handleLoginAPI,
    getAllUsersAPI,
    createNewUserAPI,
    deleteUserAPI,
    editUserAPI
};