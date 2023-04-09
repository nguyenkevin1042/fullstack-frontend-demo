import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    allUsers: [],
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
        default:
            return state;
    }
}

export default adminReducer;