/**
 * Created by kirill on 8/21/17.
 * moonion.com
 */

import {go} from '../../common/actions';
import {get, post, auth, getPage} from '../../common/helpers/api';

import {ERROR_ALERT, SUCCESS_ALERT} from '../../common/constants/actions';
import {SET_PLAYERS,
        SET_SCOUTS ,
        CLEAR_LIST ,
        SET_LEAGUES,
        SET_HEADERS} from "../constants/actions";
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

    return getPage(addRequestParams('/api/v2/user/player-search' , params))
        .then(players => {
            dispatch({type: SET_PLAYERS , payload: players.items});
            dispatch({type: SET_HEADERS , payload: {count: players.count , page: players.page , pageCount: players.pageCount , perPage: players.perPage}});
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        });
}

export const uploadScouts = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});

    return getPage(addRequestParams('/api/v2/user/scout-search', params))
        .then(scouts => {
            dispatch({type: SET_SCOUTS , payload: scouts.items})
            dispatch({type: SET_HEADERS , payload: {count: scouts.count , page: scouts.page , pageCount: scouts.pageCount , perPage: scouts.perPage}});

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

    getPage('/api/v2/user/scout-search' + params )
        .then(scouts => {
            dispatch({type: SET_SCOUTS , payload: scouts.items.length > 1 ? scouts.items : []});
            dispatch({type: SET_HEADERS , payload: {count: scouts.count , page: scouts.page , pageCount: scouts.pageCount , perPage: scouts.perPage}});
            dispatch(go('/search/scout' + params));
        })
        .catch(message => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        });
}


export const filterPlayers = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});

    getPage('/api/v2/user/player-search' + params)
        .then(players => {
            dispatch({type: SET_PLAYERS , payload: players.items.length > 1 ? players.items : [] });
            dispatch({type: SET_HEADERS , payload: {count: players.count , page: players.page , pageCount: players.pageCount , perPage: players.perPage}});
            dispatch(go('/search/player' + params));
        })
        .catch(message => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
}