/**
 * Created by kirill on 8/21/17.
 * moonion.com
 */

import {go ,startLoading , stopLoading} from '../../common/actions';
import {get, post, auth, getPage} from '../../common/helpers/api';

import {ERROR_ALERT, SUCCESS_ALERT} from '../../common/constants/actions';
import {
    SET_PLAYERS,
    SET_SCOUTS,
    CLEAR_LIST,
    SET_LEAGUES,
    SET_HEADERS,
    SET_FILTERS,
    CLEAR_FILTERS,
    SET_LEVELS
} from "../constants/actions";
import {LOAD} from '../../common/constants/actions';
import {addRequestParams} from "../helpers/helpers";

import queryString from 'query-string';

const playerSearch = '/api/v2/user/player-search';
const scoutSearch =  '/api/v2/user/scout-search';

export const uploadPlayers = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});
    dispatch(startLoading());

    let request = typeof params === 'object' ? addRequestParams(playerSearch , params) : playerSearch + params;

    return getPage(request)
        .then(players => {
            dispatch({type: SET_PLAYERS , payload: players.items});
            dispatch({type: SET_HEADERS , payload: {count: players.count , page: players.page , pageCount: players.pageCount , perPage: players.perPage}});


            request = request.replace('&per-page=18' , '');
            dispatch(go('/search/player?' + request.split('?')[1]));

            dispatch(stopLoading());
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message, page:'search'}});
            dispatch(stopLoading());
        });
};

export const uploadScouts = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});
    dispatch(startLoading());


    let request = typeof params === 'object' ? addRequestParams(scoutSearch , params) : scoutSearch + params;

    return getPage(request)
        .then(scouts => {
            dispatch({type: SET_SCOUTS , payload: scouts.items});
            dispatch({type: SET_HEADERS , payload: {count: scouts.count , page: scouts.page , pageCount: scouts.pageCount , perPage: scouts.perPage}});

            request = request.replace('&per-page=18' , '');
            dispatch(go('/search/scout?' + request.split('?')[1]));

            dispatch(stopLoading());

        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT , payload: {message, page:'search'}});
            dispatch(stopLoading());
        });
};


export const setFilters = (filters , type) => dispatch => {
    dispatch({type : SET_FILTERS , payload : {filters , type: type || 'player'} });
};

export const clearFilters = () => dispatch => {
    dispatch({type: CLEAR_FILTERS});
};

export const filterScouts = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});
    dispatch(startLoading());

    // just for beautifull url , if delete this line nothing will change in
    // flow of application but url won't show everything correctly
    params = params.replace(/page=.*?&/ , 'page=1&');


    let request = typeof params === 'object' ? addRequestParams(playerSearch , params) : playerSearch + params;

    getPage('/api/v2/user/scout-search' + params )
        .then(scouts => {
            dispatch({type: SET_SCOUTS , payload: scouts.items.length >= 1 ? scouts.items : []});
            dispatch({type: SET_HEADERS , payload: {count: scouts.count , page: scouts.page , pageCount: scouts.pageCount , perPage: scouts.perPage}});
            dispatch(go('/search/scout' + params));
            dispatch(stopLoading());
        })
        .catch(message => {
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        });
};

export const filterPlayers = (params) => dispatch => {
    dispatch({type: CLEAR_LIST});
    dispatch(startLoading());

    // just for beautifull url , if delete this line nothing will change in
    // flow of application but url won't show everything correctly
    params = params.replace(/page=.*?&/ , 'page=1&');

    let request = typeof params === 'object' ? addRequestParams(playerSearch , params) : playerSearch + params;


    getPage(request)
        .then(players => {

            dispatch({type: SET_PLAYERS , payload: players.items.length >= 1 ? players.items : [] });
            dispatch({type: SET_HEADERS , payload: {count: players.count , page: players.page , pageCount: players.pageCount , perPage: players.perPage}});
            dispatch(go('/search/player' + params));
            dispatch(stopLoading());

        })
        .catch(message => {
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};


export const fetchLevels = () => dispatch => {
    dispatch(startLoading());
    get('/api/v2/level/get-list')
        .then(list => {
            dispatch({type: SET_LEVELS , payload: list})
            dispatch(stopLoading());
        })
        .catch(message => {
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};