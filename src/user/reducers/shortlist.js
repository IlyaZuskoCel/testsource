/**
 * Created by kirill on 9/07/17.
 * moonion.com
 */


import {SET_SHORTLIST , CLEAR_SHORTLIST, UNSET_USER_FAVORITE} from '../constants/actions';

function shortlist(state = [], action) {
    switch (action.type) {
        case SET_SHORTLIST:
            state = action.payload;
            return state;
        case CLEAR_SHORTLIST:
            state = [];
            return state;
        case UNSET_USER_FAVORITE:
            return state && state.length > 0 ? state.filter(user => user.id !== action.payload) : state;
        default:
            return state;
    }
}

export default shortlist;
