/**
 * Created by kirill on 8/23/17.
 * moonion.com
 */

import {SET_PLAYERS, SET_SCOUTS , CLEAR_LIST} from "../constants/actions";

function players(state = [], action) {
    switch (action.type) {
        case SET_PLAYERS:
            state = action.payload;
            return state;
        case SET_SCOUTS:
            state = action.payload
            return state;
        case CLEAR_LIST:
            state = [];
            return state;
        default:
            return state;
    }
}

export default players;
