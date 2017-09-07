/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {SET_USER, SET_USER_FAVORITE, UNSET_USER_FAVORITE, INC_EMAIL_COUNT} from '../constants/actions';

import {DELETE_VIDEO} from '../../video/constants/actions'

function current(state = null, action) {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        case INC_EMAIL_COUNT:
            return state && action.payload === state.id ? {
                ...state,
                is_messaged: parseInt(state.is_messaged) + 1
            } : state;
        case SET_USER_FAVORITE:
            return state && action.payload === state.id ? {...state, is_tagged: true} : state;
        case UNSET_USER_FAVORITE:
            return state && action.payload === state.id ? {...state, is_tagged: false} : state;
        case DELETE_VIDEO:
            return {...state, videos: state.videos.filter(i => i.id !== action.payload)};
        default:
            return state;
    }
}

export default current;
