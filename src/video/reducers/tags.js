/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import {SET_TAGS} from '../constants/actions';


function tags(state = [], action) {
    switch (action.type) {
        case SET_TAGS:
            return action.payload;
        default:
            return state;
    }
}

export default tags;
