/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {push, goBack} from 'react-router-redux';

import {get, post, postForm, auth, getAuth} from '../../common/helpers/api';


import {ERROR_ALERT, SUCCESS_ALERT} from '../../common/constants/actions';
import {
    LOGIN,
    LOGOUT,
    SET_CURRENT,
    SET_USER,
    SET_USER_FAVORITE,
    UNSET_USER_FAVORITE,
    SET_CURRENT_PHOTO,
    SET_CURRENT_PHONE,
} from '../constants/actions';


import {LOAD} from '../../common/constants/actions';

import {SCOUT_ROLE, PLAYER_ROLE} from '../constants'

export const logIn = (email, password) => dispatch => {
    return post('/api/v2/profile/login', {email, password})
        .then(user => {
            if ('error' in user)
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});

            auth(user.access_token);
            dispatch({type: LOGIN, payload: user});
            if (user.role === SCOUT_ROLE)
                return dispatch(push('/search/player'));

            return dispatch(push('/profile'));
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const confirm = token => dispatch => {
    return get(`/api/v2/profile/confirm-email/${token}`)
        .then(user => {
            if ('error' in user)
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});

            auth(user.access_token);

            dispatch({
                type: SUCCESS_ALERT,
                payload: {message: 'Your account was confirmed successfully!'}
            });

            dispatch({type: LOGIN, payload: user});
            if (user.role === SCOUT_ROLE)
                return dispatch(push('/search/player'));

            return dispatch(push('/profile'));
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const registerScout = user => dispatch => {
    return post('/api/v2/profile/signup-scout', user)
        .then(user => {
            if ('error' in user)
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});
            dispatch({
                type: SUCCESS_ALERT,
                payload: {message: 'Your account was registered successfully! Please confirm your account.'}
            });
            dispatch(push('/sign/in'))
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const registerPlayer = user => dispatch => {
    return post('/api/v2/profile/signup-player', user)
        .then(user => {
            if ('error' in user)
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});
            dispatch({
                type: SUCCESS_ALERT,
                payload: {message: 'Your account was registered successfully! Please confirm your account.'}
            });
            dispatch(push('/sign/in'))
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const logOut = () => dispatch => {
    return get('/api/v2/profile/logout')
        .then(() => {
            auth('');
            dispatch({type: LOGOUT});
            dispatch(push('/sign/in'));
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const getCurrent = () => dispatch => {
    return get('/api/v2/profile/get')
        .then(user => {

            if ('error' in user)
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});

            if (user.length === 0 && getAuth()) {
                dispatch(logOut());
            }

            dispatch({type: SET_CURRENT, payload: user});
            dispatch({type: LOAD});
        })
        .catch((message) => {
            dispatch({type: LOAD});
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const getUser = (id) => dispatch => {
    dispatch({type: SET_USER, payload: null});
    return get(`/api/v2/user/get/${id}`)
        .then(user => {
            if ('error' in user)
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});
            dispatch({type: SET_USER, payload: user});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const update = (data) => dispatch => {
    return post(`/api/v2/profile/update`, data)
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});
            dispatch({type: SET_CURRENT, payload: result});
            dispatch(push('/profile'));
            dispatch({type: SUCCESS_ALERT, payload: {message: 'Profile was updated successfully'}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const deleteProfile = (password, why) => dispatch => {
    return post(`/api/v2/profile/delete-profile`, {password, why})
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            dispatch({type: SUCCESS_ALERT, payload: {message: 'Profile was deleted successfully'}});
            dispatch(logOut());
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};


export const uploadPhoto = (file) => dispatch => {
    let form = new FormData();
    if (file)
        form.append('UploadForm', file);

    return postForm(`/api/v2/profile/image/profile`, form)
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});
            dispatch({type: SET_CURRENT_PHOTO, payload: result.profile_picture});
            dispatch({type: SUCCESS_ALERT, payload: {message: 'Profile picture was uploaded successfully'}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const addFavorite = (id) => dispatch => {
    return post(`/api/v2/activity/follow`, {id_user_player: id})
        .then(result => {
            if (result.success) {

                return dispatch({
                    type: SET_USER_FAVORITE,
                    payload: id
                });
            }
            return dispatch({type: ERROR_ALERT, payload: {message: "Player wasn't added to shortlist!"}});

        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const removeFavorite = (id) => dispatch => {
    return post(`/api/v2/activity/unfollow`, {id_user_player: id})
        .then(result => {
            if (result.success) {
                return dispatch({
                    type: UNSET_USER_FAVORITE,
                    payload: id
                });
            }
            return dispatch({type: ERROR_ALERT, payload: {message: "Player wasn't removed from shortlist"}});

        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
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
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const verifyScout = phone => dispatch => {
    return post(`/api/v2/message/verify-message`, {phone})
        .then(result => {
            if (result.success) {
                dispatch({type: SET_CURRENT_PHONE, payload: phone});
                return dispatch({type: SUCCESS_ALERT, payload: {message: "Your message was successfully sent!"}});
            }
            return dispatch({type: ERROR_ALERT, payload: {message: "Your message wasn't sent!"}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const changePassword = (password_old, password_new) => dispatch => {
    return post(`/api/v2/profile/change-password`, {password_old, password_new})
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            dispatch(goBack());
            return dispatch({type: SUCCESS_ALERT, payload: {message: "Your password was updated successfully!"}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};


export const report = (id_violator, type, message) => dispatch => {
    return post(`/api/v2/activity/report`, {id_violator, type, message})
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            return dispatch({type: SUCCESS_ALERT, payload: {message: "Report message was sent successfully! "}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const forgotPassword = email => dispatch => {
    return post(`/api/v2/profile/reset-password-request`, {email})
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            return dispatch({
                type: SUCCESS_ALERT,
                payload: {message: "We have sent email with link to change password."}
            });
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const forgotPasswordToken = (token, password, password_repeat) => dispatch => {
    return post(`/api/v2/profile/reset-password/${token}`, {password, password_repeat})
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});
            dispatch(push('/sign/in'));
            return dispatch({type: SUCCESS_ALERT, payload: {message: "Password was changed successfully!"}});
        })
        .catch((message) => {

            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const resetPassword = () => dispatch => {
    return get(`/api/v2/profile/temp-password`)
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            return dispatch({type: SUCCESS_ALERT, payload: {message: "We emailed you a temporary password"}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};
