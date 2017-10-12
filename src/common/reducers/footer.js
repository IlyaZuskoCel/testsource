/**
 * Created by aleksandr on 8/9/17.
 * moonion.com
 */


import {FOOTER_SHOW, FOOTER_HIDE} from '../constants/actions';


function footer(state = true, action) {
    switch (action.type) {
        case FOOTER_SHOW:
            return true;
        case FOOTER_HIDE:
            return false;
        default:
            return state;
    }
}

export default footer;