/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {push, goBack} from 'react-router-redux';

import {get, post, auth} from '../../common/helpers/api';


import {ERROR_ALERT, SUCCESS_ALERT} from '../../common/constants/actions';
import {LOGIN, LOGOUT, SET_CURRENT, SET_USER} from '../constants/actions';
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

export const getUser = (id) => dispatch => {
    dispatch({type: SET_USER, payload: null});
    return get(`/api/v2/user/get/${id}`)
        .then(user => {
            dispatch({type: SET_USER, payload: user});
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};
export const addFavorite = (id) => dispatch => {
    return post(`/api/v2/activity/follow`, {id_user_player: id})
        .then(result => {
            if (result.success)
                return dispatch({
                    type: SUCCESS_ALERT,
                    payload: {message: "Player was successfully added to shortlist!"}
                });
            return dispatch({type: ERROR_ALERT, payload: {message: "Player wasn't added to shortlist!"}});

        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const removeFavorite = (id) => dispatch => {
    return post(`/api/v2/activity/unfollow`, {id_user_player: id})
        .then(result => {
            if (result.success)
                return dispatch({
                    type: SUCCESS_ALERT,
                    payload: {message: "Player was successfully removed from shortlist"}
                });
            return dispatch({type: ERROR_ALERT, payload: {message: "Player wasn't removed from shortlist"}});

        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const sendEmail = (id, subject, text) => dispatch => {
    return post(`/api/v2/message/send-email`, {recipient: id, subject, text})
        .then(result => {
            if (result.success)
                return dispatch({type: SUCCESS_ALERT, payload: {message: "Your message was successfully sent!"}});
            return dispatch({type: ERROR_ALERT, payload: {message: "Your message wasn't sent!"}});

        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};