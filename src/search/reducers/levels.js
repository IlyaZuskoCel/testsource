/**
 * Created by kirill on 9/11/17.
 * moonion.com
 */

import {SET_LEVELS} from "../constants/actions";

function levels(state = [], action) {
    switch (action.type) {
        case SET_LEVELS:
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default levels;
