/**
 * Created by kirill on 8/21/17.
 * moonion.com
 */

import {go} from '../../common/actions';
import {get, post, auth} from '../../common/helpers/api';

import {ERROR_ALERT, SUCCESS_ALERT} from '../../common/constants/actions';
import {SET_PLAYERS,
        SET_SCOUTS ,
        CLEAR_LIST ,
        SET_LEAGUES} from "../constants/actions";
import {LOAD} from '../../common/constants/actions';

import queryString from 'query-string';

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

    return get(addRequestParams('/api/v2/user/player-search' , params))
        .then(players => {
            dispatch({type: SET_PLAYERS , payload: players});
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        });
}

export const uploadScouts = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});


    return get(addRequestParams('/api/v2/user/scout-search', params))
        .then(scouts => {
           dispatch({type: SET_SCOUTS , payload: scouts})
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT , payload: {message}})
        });
}

export const getLeagues = () => dispatch => {
    get('/api/v2/league/get-list')
        .then(leagues => {
            dispatch({type: SET_LEAGUES , payload: leagues});
        })
        .catch(message => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        });
}

export const filterScouts = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});

    get('/api/v2/user/scout-search' + params )
        .then(scouts => {
            dispatch({type: SET_SCOUTS , payload: scouts});
            dispatch(go('/search/scout' + params));
        })
}


export const filterPlayers = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});

    console.log(params);

    get('/api/v2/user/player-search' + params)
        .then(players => {
            dispatch({type: SET_PLAYERS , payload: players});
            dispatch(go('/search/player' + params));
        })
}
