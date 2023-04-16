import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    allUsers: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    isLoadingGenders: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //GENDER
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGenders = true;
            return {
                ...state

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGenders = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGenders = false;
            state.genders = [];
            return {
                ...state

            }
        //POSITION
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.genders = [];
            return {
                ...state

            }
        //ROLE
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state

            }
        //ALL USERS
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.allUsers = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAIL:
            state.allUsers = [];
            return {
                ...state
            }
        //TOP DOCTOR
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.doctors;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
            state.topDoctors = [];
            return {
                ...state
            }
        //ALL DOCTORS
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.doctors;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAIL:
            state.allDoctors = [];
            return {
                ...state
            }
        //CODE TIME
        case actionTypes.FETCH_ALLCODE_TIME_SUCCESS:
            state.allScheduleTime = action.time;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_TIME_FAIL:
            state.roles = [];
            return {
                ...state

            }
        default:
            return state;
    }
}

export default adminReducer;