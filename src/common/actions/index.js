/**
 * Created by aleksandr on 7/26/17.
 * moonion.com
 */

import {push as routerGo, goBack as routerBack} from 'react-router-redux';

import {SUCCESS_ALERT, ERROR_ALERT, REMOVE_ALERT, SET_LEAGUES, SET_TEAMS, SET_COUNTRIES, FILTER_LEAGUES} from '../constants/actions';

import {logOut} from '../../user/actions'

import {get} from '../helpers/api';

export const go = page => dispatch => {
    dispatch(routerGo(page));
};

export const goBack = () => dispatch => {
    dispatch(routerBack());
};

export const removeAlert = () => dispatch => {
    dispatch({type: REMOVE_ALERT});
};

export const addErrorAlert = (message, options) => dispatch => {
    dispatch({type: ERROR_ALERT, payload: {message, ...options}});
};
export const addSuccessAlert = (title, options) => dispatch => {
    dispatch({type: SUCCESS_ALERT, payload: {message, ...options}});
};
export const getLeagues = () => dispatch => {
    return get(`/api/v2/league/get-list`)
        .then(leagues => {
            if ('error' in leagues)
                return dispatch({type: ERROR_ALERT, payload: {message: leagues.error.message}});
            dispatch({type: SET_LEAGUES, payload: leagues});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};
// /v2/team/get-list[?fields=id,name]
export const getTeams = () => dispatch => {
    return get(`/api/v2/team/get-list?fields=id,id_league,name`)
        .then(teams => {
            if ('error' in teams)
                return dispatch({type: ERROR_ALERT, payload: {message: teams.error.message}});
            dispatch({type: SET_TEAMS, payload: teams});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const getCountries = () => dispatch => {
    return get(`/api/v2/country/get-list`)
        .then(data => {
            if ('error' in data)
                return dispatch({type: ERROR_ALERT, payload: {message: data.error.message}});
            dispatch({type: SET_COUNTRIES, payload: data});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};
