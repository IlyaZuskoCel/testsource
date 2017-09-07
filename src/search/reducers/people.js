/**
 * Created by kirill on 8/23/17.
 * moonion.com
 */

import {SET_PLAYERS, SET_SCOUTS, CLEAR_LIST} from "../constants/actions";
import {UNSET_USER_FAVORITE, SET_USER_FAVORITE} from "../../user/constants/actions";

let user;

function players(state = [], action) {
    switch (action.type) {
        case SET_PLAYERS:
            state = action.payload;
            return state;
        case SET_SCOUTS:
            state = action.payload;
            return state;
        case CLEAR_LIST:
            state = [];
            return state;
            return action.payload;
        case SET_USER_FAVORITE:
            return state && state.length > 0 ? state.map(user => user.id !== action.payload ? user : {
                ...user,
                is_tagged: true
            }) : state;
        case UNSET_USER_FAVORITE:
            return state && state.length > 0 ? state.map(user => user.id !== action.payload ? user : {
                ...user,
                is_tagged: false
            }) : state;
        default:
            return state;
    }
}

export default players;
