import actionTypes from './actionTypes';
import {
    getAllCodesAPI, createNewUserAPI,
    getAllUsersAPI, deleteUserAPI, editUserAPI,
    getTopDoctorsHomeAPI, getAllDoctorsAPI,
    saveDoctorInforAPI, getAllSpecialtyAPI
} from '../../services/userService';
import { toast } from 'react-toastify';

//GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            });

            let res = await getAllCodesAPI('gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.log("fetchGenderStart Error: ", error)
        }
    }
}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

//POSITION
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodesAPI('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
            console.log("fetchPositionStart Error: ", error)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

//ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodesAPI('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            console.log("fetchPositionStart Error: ", error)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

//CREATE USER
export const createNewUser = (userData) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewUserAPI(userData);
            if (res && res.errCode === 0) {
                toast.success('Create user success');
                dispatch(createUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(createUserFail());
            }
        } catch (error) {
            dispatch(createUserFail());
            console.log("createNewUser Error: ", error)
        }
    }
}

export const createUserSuccess = (userData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: userData
})

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

//ALL USERS
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsersAPI();
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            } else {
                dispatch(fetchAllUsersFail());
            }
        } catch (error) {
            dispatch(fetchAllUsersFail());
            console.log("fetchAllUsersStart Error: ", error)
        }
    }
}

export const fetchAllUsersSuccess = (userData) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: userData
})

export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL
})

//DELETE USERS
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserAPI(userId);

            if (res && res.errCode === 0) {
                toast.success('Delete user success');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFail());
            }
        } catch (error) {
            dispatch(deleteUserFail());
            console.log("deleteUserFail Error: ", error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

//UPDATE USERS
export const updateUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserAPI(userData);
            if (res && res.errCode === 0) {
                toast.success('Update user success');
                dispatch(updateUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(updateUserFail());
            }
        } catch (error) {
            dispatch(updateUserFail());
            console.log("updateUserFail Error: ", error)
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})

export const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_FAIL
})

//TOP DOCTOR
export const fetchTopDoctors = (limitInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorsHomeAPI(limitInput);

            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorsFail());
            }
        } catch (error) {
            dispatch(fetchTopDoctorsFail());
            console.log("fetchTopDoctors Error: ", error)
        }
    }
}

export const fetchTopDoctorsSuccess = (doctorsData) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    doctors: doctorsData
})

export const fetchTopDoctorsFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAIL
})

//ALL DOCTORS
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsAPI();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorsFail());
            }
        } catch (error) {
            dispatch(fetchAllDoctorsFail());
            console.log("fetchAllUsersStart Error: ", error)
        }
    }
}

export const fetchAllDoctorsSuccess = (doctorData) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    doctors: doctorData
})

export const fetchAllDoctorsFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAIL
})

//SAVE DOCTOR INFORMATION
export const saveDoctorInformation = (dataInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDoctorInforAPI(dataInput);
            if (res && res.errCode === 0) {
                toast.success('Save Doctor Information success');
                dispatch(saveDoctorInformationSuccess());
            } else {
                dispatch(saveDoctorInformationFail());
            }
        } catch (error) {
            dispatch(saveDoctorInformationFail());
            toast.success("Save Doctor Information Fail");
            console.log("Save Doctor Information Error: ", error)
        }
    }
}

export const saveDoctorInformationSuccess = () => ({
    type: actionTypes.SAVE_DOCTOR_INFORMATION_SUCCESS,
})

export const saveDoctorInformationFail = () => ({
    type: actionTypes.SAVE_DOCTOR_INFORMATION_FAIL
})

//ALL CODE TIME
export const fetchAllCodeTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodesAPI('time');
            if (res && res.errCode === 0) {
                dispatch(fetchAllCodeTimeSuccess(res.data));
            } else {
                dispatch(fetchAllCodeTimeFail());
            }
        } catch (error) {
            dispatch(fetchAllCodeTimeFail());
            console.log("fetchAllUsersStart Error: ", error)
        }
    }
}

export const fetchAllCodeTimeSuccess = (timeData) => ({
    type: actionTypes.FETCH_ALLCODE_TIME_SUCCESS,
    time: timeData
})

export const fetchAllCodeTimeFail = () => ({
    type: actionTypes.FETCH_ALLCODE_TIME_FAIL
})

//  GET ALLCODE PRICE PAYMENT PROVINCE
export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllCodesAPI('price');
            let resPayment = await getAllCodesAPI('payment');
            let resProvince = await getAllCodesAPI('province');
            let resSpecialty = await getAllSpecialtyAPI();

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data
                }
                dispatch(getRequiredDoctorInfoSuccess(data));
            } else {
                dispatch(getRequiredDoctorInfoFail());
            }
        } catch (error) {
            dispatch(getRequiredDoctorInfoFail());
            console.log("getRequiredDoctorInfo Error: ", error)
        }
    }
}

export const getRequiredDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_INFO_SUCCESS,
    price: data.resPrice,
    payment: data.resPayment,
    province: data.resProvince,
    specialty: data.resSpecialty
})

export const getRequiredDoctorInfoFail = () => ({
    type: actionTypes.FETCH_DOCTOR_INFO_FAIL
})
