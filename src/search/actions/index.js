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
import {addRequestParams} from "../helpers/helpers";

import queryString from 'query-string';


const playerSearch = '/api/v2/user/player-search';
const scoutSearch =  '/api/v2/user/scout-search';

export const uploadPlayers = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});

    let request = typeof params === 'object' ? addRequestParams(playerSearch , params) : playerSearch + params;

    return getPage(request)
        .then(players => {
            dispatch({type: SET_PLAYERS , payload: players.items});
            dispatch({type: SET_HEADERS , payload: {count: players.count , page: players.page , pageCount: players.pageCount , perPage: players.perPage}});
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        });
};

export const uploadScouts = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});

    let request = typeof params === 'object' ? addRequestParams(scoutSearch , params) : scoutSearch + params;

    return getPage(request)
        .then(scouts => {
            dispatch({type: SET_SCOUTS , payload: scouts.items});
            dispatch({type: SET_HEADERS , payload: {count: scouts.count , page: scouts.page , pageCount: scouts.pageCount , perPage: scouts.perPage}});
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT , payload: {message}})
        });
};

export const getLeagues = () => dispatch => {

    get('/api/v2/league/get-list')
        .then(leagues => {
            dispatch({type: SET_LEAGUES , payload: leagues});

        })
        .catch(message => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        });
};

export const filterScouts = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});

    let request = typeof params === 'object' ? addRequestParams(playerSearch , params) : playerSearch + params;

    getPage('/api/v2/user/scout-search' + params )
        .then(scouts => {

            dispatch({type: SET_SCOUTS , payload: scouts.items.length >= 1 ? scouts.items : []});
            dispatch({type: SET_HEADERS , payload: {count: scouts.count , page: scouts.page , pageCount: scouts.pageCount , perPage: scouts.perPage}});
            dispatch(go('/search/scout' + params));
        })
        .catch(message => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        });
};


export const filterPlayers = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});

    let request = typeof params === 'object' ? addRequestParams(playerSearch , params) : playerSearch + params;

    getPage(request)
        .then(players => {

            dispatch({type: SET_PLAYERS , payload: players.items.length >= 1 ? players.items : [] });
            dispatch({type: SET_HEADERS , payload: {count: players.count , page: players.page , pageCount: players.pageCount , perPage: players.perPage}});
            dispatch(go('/search/player' + params));
        })
        .catch(message => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};


export const follow = (player) => dispatch => {
        post(player.is_tagged ? '/api/v2/activity/unfollow' : '/api/v2/activity/follow' , {"id_user_player" : player.id})
            .catch(message => {
                dispatch({type: ERROR_ALERT, payload: {message}});
            });
};