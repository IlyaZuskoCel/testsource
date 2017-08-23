import {SET_TEAMS} from '../constants/actions';


function teams(state = [], action) {
    switch (action.type) {
        case SET_TEAMS:
            return action.payload;
        default:
            return state;
    }
}

export default teams;