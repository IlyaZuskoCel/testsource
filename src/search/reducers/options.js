/**
 * Created by kirill on 8/28/17.
 * moonion.com
 */


import {SET_LEAGUES} from "../constants/actions";

function options(state = {}, action) {
    switch (action.type) {
        case SET_LEAGUES:
            state.leagues = action.payload.filter(league => {
                return league.is_active === 1 && league.is_verify === 1
            });

            return state;
        default:
            return state;
    }
}

export default options;
