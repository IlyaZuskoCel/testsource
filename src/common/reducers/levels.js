
import {SET_LEVELS} from '../constants/actions';


function levels(state = [], action) {
    switch (action.type) {
        case SET_LEVELS:
            return action.payload;
        default:
            return state;
    }
}

export default levels;