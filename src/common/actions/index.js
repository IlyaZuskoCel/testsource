/**
 * Created by aleksandr on 7/26/17.
 * moonion.com
 */

import {push as routerGo, goBack as routerBack} from 'react-router-redux';

import {
    SUCCESS_ALERT, ERROR_ALERT, REMOVE_ALERT, SET_LEAGUES, SET_TEAMS, SET_COUNTRIES,
    INC_LOADER, DEC_LOADER,
    FOOTER_SHOW,
    FOOTER_HIDE,
    HEADER_BACKGROUND_SHOW,
    HEADER_BACKGROUND_HIDE
} from '../constants/actions';

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
    dispatch(startLoading());
    return get(`/api/v2/league/get-list`)
        .then(leagues => {
            dispatch(stopLoading());

            if ('error' in leagues)
                return dispatch({type: ERROR_ALERT, payload: {message: leagues.error.message}});
            dispatch({type: SET_LEAGUES, payload: leagues});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading())
        })
};
// /v2/team/get-list[?fields=id,name]
export const getTeams = () => dispatch => {
    dispatch(startLoading());
    return get(`/api/v2/team/get-list?fields=id,id_league,name`)
        .then(teams => {
            dispatch(stopLoading());

            if ('error' in teams)
                return dispatch({type: ERROR_ALERT, payload: {message: teams.error.message}});
            dispatch({type: SET_TEAMS, payload: teams});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const getCountries = () => dispatch => {
    dispatch(startLoading());

    return get(`/api/v2/country/get-list`)
        .then(data => {
            dispatch(stopLoading());

            if ('error' in data)
                return dispatch({type: ERROR_ALERT, payload: {message: data.error.message}});
            dispatch({type: SET_COUNTRIES, payload: data});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const startLoading = () => dispatch => {
    dispatch({type: INC_LOADER});
};

export const stopLoading = () => dispatch => {
    dispatch({type: DEC_LOADER});
};


export const showHeaderBackground = () => dispatch => {
    dispatch({type: HEADER_BACKGROUND_SHOW});
};

export const hideHeaderBackground = () => dispatch => {
    dispatch({type: HEADER_BACKGROUND_HIDE});
};

export const showFooter = () => dispatch => {
    dispatch({type: FOOTER_SHOW});
};

export const hideFooter = () => dispatch => {
    dispatch({type: FOOTER_HIDE});
};

