/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {LOGIN, LOGOUT, SET_CURRENT, SET_CURRENT_PHOTO, SET_CURRENT_PHONE} from '../constants/actions';


function current(state = null, action) {
    switch (action.type) {
        case SET_CURRENT_PHONE:
            return {...state, phone: action.payload};
        case SET_CURRENT_PHOTO:
            return {...state, profile_picture: action.payload};
        case LOGIN:
        case SET_CURRENT:
            return {
                ...action.payload
            };
        case LOGOUT:
            return null;
        default:
            return state;
    }
}

export default current;
