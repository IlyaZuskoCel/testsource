/**
 * Created by aleksandr on 7/26/17.
 * moonion.com
 */

import {push as routerGo, goBack as routerBack} from 'react-router-redux';

import {SUCCESS_ALERT, ERROR_ALERT, REMOVE_ALERT} from '../constants/actions';

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