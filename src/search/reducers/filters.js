/**
 * Created by kirill on 9/07/17.
 * moonion.com
 */

import {CLEAR_FILTERS , SET_FILTERS} from "../constants/actions";

function filters(state = null, action) {
    switch (action.type) {
        case CLEAR_FILTERS:
            state = null;
            return state;
        case SET_FILTERS:
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default filters;
