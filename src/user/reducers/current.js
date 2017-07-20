/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {LOGIN, LOGOUT, SET_CURRENT} from '../constants/actions';


function current(state = null, action) {
    switch (action.type) {
        case LOGIN:
        case SET_CURRENT:
            return action.payload;
        case LOGOUT:
            return null;
        default:
            return state;
    }
}

export default current;
