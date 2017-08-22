/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {SET_USER, SET_USER_FAVORITE, UNSET_USER_FAVORITE} from '../constants/actions';


function current(state = null, action) {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        case SET_USER_FAVORITE:
            return action.payload === state.id ? {...state, is_tagged: true} : state;
        case UNSET_USER_FAVORITE:
            return action.payload === state.id ? {...state, is_tagged: false} : state;
        default:
            return state;
    }
}

export default current;
