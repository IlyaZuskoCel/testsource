/**
 * Created by aleksandr on 8/9/17.
 * moonion.com
 */


import {ERROR_ALERT, SUCCESS_ALERT, REMOVE_ALERT} from '../constants/actions';


function alert(state = {message: '', open: false, type: 'success'}, action) {
    switch (action.type) {
        case ERROR_ALERT:
            console.log(action);
            return {type: 'error', open: true, ...action.payload};
        case SUCCESS_ALERT:
            return {type: 'success', open: true, ...action.payload};
        case REMOVE_ALERT:
            return {...state, open: false};
        default:
            return state;
    }
}

export default alert;