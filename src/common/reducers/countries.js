import {SET_COUNTRIES} from '../constants/actions';


function countries(state = [], action) {
    switch (action.type) {
        case SET_COUNTRIES:
            return action.payload;
        default:
            return state;
    }
}

export default countries;