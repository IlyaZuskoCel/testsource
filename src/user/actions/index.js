/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {push, goBack} from 'react-router-redux';

import {get, post, auth} from '../../common/helpers/api';


import {LOGIN, LOGOUT, SET_CURRENT} from '../constants/actions';
import {LOAD} from '../../common/constants/actions';


export const logIn = (username, password) => dispatch => {
    return post('/api/v2/profile/login', {username, password})
        .then(user => {
            auth(user.access_token);
            dispatch({type: LOGIN, payload: user});
            dispatch(push('/profile'))
        })
        .catch()
};

export const registerScout = user => dispatch => {
    return post('/api/v2/profile/signup-scout', user)
        .then(user => {
            dispatch(push('/login'))
        })
        .catch()
};

export const registerPlayer = user => dispatch => {
    return post('/api/v2/profile/signup-player', user)
        .then(user => {
            dispatch(push('/login'))
        })
        .catch()
};

export const logOut = () => dispatch => {
    return get('/api/v2/profile/logout')
        .then(() => {
            auth('');
            dispatch({type: LOGOUT});
            dispatch(push('/login'));
        })
};

export const getCurrent = () => dispatch => {
    return get('/api/v2/profile/get')
        .then(user => {
            dispatch({type: SET_CURRENT, payload: user});
            dispatch({type: LOAD});
        })
        .catch(() => {
            dispatch({type: LOAD});
        })
};