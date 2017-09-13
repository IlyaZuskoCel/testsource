
import {SET_LEAGUES , FILTER_LEAGUES} from '../constants/actions';


function leagues(state = [], action) {
    switch (action.type) {
        case SET_LEAGUES:
            return action.payload;
        case FILTER_LEAGUES:
            return state.filter(league => parseInt(league.id_level) === action.payload);
        default:
            return state;
    }
}

export default leagues;