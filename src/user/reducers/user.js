/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {SET_USER} from '../constants/actions';


function current(state = null, action) {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        default:
            return state;
    }
}

export default current;
