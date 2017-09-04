/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import {SET_VIDEO, SET_VIDEO_FIELD, SET_VIDEO_PROGRESS} from '../constants/actions';


function video(state = {}, action) {
    switch (action.type) {
        case SET_VIDEO_FIELD:
            return {...state, [action.payload.field]: action.payload.value};
        case SET_VIDEO_PROGRESS:
            return {...state, progress: Math.round(action.payload * 100)};
        case SET_VIDEO:
            return action.payload;
        default:
            return state;
    }
}

export default video;
