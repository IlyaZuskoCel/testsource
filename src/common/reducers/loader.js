/**
 * Created by kirill on 9/13/17.
 * moonion.com
 */

import {INC_LOADER , DEC_LOADER} from "../constants/actions";

function loader(state = 0, action) {
    switch (action.type) {
        case INC_LOADER:
            return state + 1;
        case DEC_LOADER:
            return Math.max(state - 1, 0);
        default:
            return state;
    }
}

export default loader;