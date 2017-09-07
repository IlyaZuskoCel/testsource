/**
 * Created by kirill on 9/07/17.
 * moonion.com
 */


import {SET_SHORTLIST , CLEAR_SHORTLIST} from '../constants/actions';

function shortlist(state = [], action) {
    switch (action.type) {
        case SET_SHORTLIST:
            state = action.payload;
            return state;
        case CLEAR_SHORTLIST:
            state = [];
            return state;
        default:
            return state;
    }
}

export default shortlist;
