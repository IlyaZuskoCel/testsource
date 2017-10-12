/**
 * Created by aleksandr on 8/9/17.
 * moonion.com
 */


import {HEADER_BACKGROUND_SHOW, HEADER_BACKGROUND_HIDE} from '../constants/actions';


function header(state = {background: true}, action) {
    switch (action.type) {
        case HEADER_BACKGROUND_SHOW:
            return {...state, background: true};
        case HEADER_BACKGROUND_HIDE:
            return {...state, background: false};
        default:
            return state;
    }
}

export default header;