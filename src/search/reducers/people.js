/**
 * Created by kirill on 8/23/17.
 * moonion.com
 */

import {SET_PLAYERS, SET_SCOUTS , CLEAR_LIST } from "../constants/actions";
import {UNSET_USER_FAVORITE , SET_USER_FAVORITE} from "../../user/constants/actions";

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
        case UNSET_USER_FAVORITE:
             user = state.find((user) => user.id === action.payload );
             if (user && user.is_tagged)
                user.is_tagged = false;
            return state;
        case SET_USER_FAVORITE:
            user = state.find((user) => user.id === action.payload);
            if (user && user.is_tagged)
                user.is_tagged = true;
            return state;
        default:
            return state;
    }
}

export default players;
