import actionTypes from './actionTypes';
import {
    getAllCodesAPI, createNewUserAPI,
    getAllUsersAPI, deleteUserAPI, editUserAPI
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
            console.log("Check user: ", res)
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