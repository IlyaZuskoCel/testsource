/**
 * Created by kirill on 8/28/17.
 * moonion.com
 */

import {SET_ALL_LEAGUES} from "../constants/actions";

function options(state = [], action) {
    switch (action.type) {
        case SET_ALL_LEAGUES:
            return action.payload;
        default:
            return state;
    }
}

export default options;