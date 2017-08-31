/**
 * Created by kirill on 8/21/17.
 * moonion.com
 */

import {SET_HEADERS} from  '../constants/actions'

function headers(state = null, action) {
    switch (action.type) {
        case SET_HEADERS:
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default headers;
