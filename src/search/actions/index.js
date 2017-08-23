/**
 * Created by kirill on 8/21/17.
 * moonion.com
 */

import {push, goBack} from 'react-router-redux';

import {get, post, auth} from '../../common/helpers/api';

import {ERROR_ALERT, SUCCESS_ALERT} from '../../common/constants/actions';
import {SET_PLAYERS, SET_SCOUTS , CLEAR_LIST} from "../constants/actions";
import {LOAD} from '../../common/constants/actions';


const addRequestParams = (url , params) => {
    if (Object.keys(params).length === 0) {
        return url;
    }

    let composedUrl = url + '?';

    for (let key in params) {
        composedUrl += `${key}=${params[key]}&`;
    }

    return composedUrl.slice(0 , composedUrl.length - 1);
};


export const uploadPlayers = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});

 //   console.log(addRequestParams('api/v2/user/player-search' , params));

    post(addRequestParams('api/v2/user/player-search' , params) , {} )
        .then(players => {
            console.log(players);
            dispatch({type: SET_PLAYERS , payload: players});
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        });
}

export const uploadScouts = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});
    post(addRequestParams('api/v2/user/scout-search', params) , {})
        .then(scouts => {
           dispatch({type: SET_SCOUTS , payload: scouts})
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT , payload: {message}})
        });
}