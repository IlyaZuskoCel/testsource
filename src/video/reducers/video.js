/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import {SET_VIDEO, UPLOAD_VIDEO, TRIM_VIDEO, SET_VIDEO_FIELD, SET_VIDEO_PROGRESS} from '../constants/actions';


function video(state = {}, action) {
    switch (action.type) {
        case SET_VIDEO_FIELD:
            return {...state, [action.payload.field]: action.payload.value};
        case SET_VIDEO_PROGRESS:
            return {...state, progress: Math.round(action.payload * 100)};
        case TRIM_VIDEO:
            return {
                ...state,
                trim_video_file_path: action.payload.trim_video_file_path,
                trim_thumb: action.payload.trim_thumb,
                time_start: action.payload.time_start,
                time_end: action.payload.time_end,
            };
        case UPLOAD_VIDEO:
            return {
                ...state,
                id: action.payload.id,
                video_path: action.payload.video_path,
                time_start: action.payload.time_start,
                time_end: action.payload.time_end,
                thumb_lg: action.payload.thumb_lg,
                duration: action.payload.duration,
                height: action.payload.height,
                width: action.payload.width,
            };
        case SET_VIDEO:
            return action.payload;
        default:
            return state;
    }
}

export default video;
