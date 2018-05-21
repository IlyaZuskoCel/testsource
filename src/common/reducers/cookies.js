/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {SET_COOKIE} from '../constants/actions';

function cookies(state = {}, action) {
    switch (action.type) {
        case SET_COOKIE:
            return action.payload;
        default:
            return state;
    }
}

export default cookies;