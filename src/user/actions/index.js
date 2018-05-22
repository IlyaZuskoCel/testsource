/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {push, goBack} from 'react-router-redux';

import {get, post, postForm, auth, getAuth} from '../../common/helpers/api';
import {startLoading, stopLoading} from "../../common/actions/index";


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
    SET_SHORTLIST,
    CLEAR_SHORTLIST,
    INC_EMAIL_COUNT
} from '../constants/actions';


import {LOAD, SET_COOKIE} from '../../common/constants/actions';

import {SCOUT_ROLE, PLAYER_ROLE} from '../constants'

export const logIn = (email, password, token) => dispatch => {
    dispatch(startLoading());
    return post('/api/v2/profile/login', {email, password}, {}, token)
        .then(user => {
            dispatch(stopLoading());

            if ('error' in user)
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});


            const url = auth(user.access_token);
            dispatch({type: LOGIN, payload: user});
            dispatch({type: SET_COOKIE, payload: {token:user.access_token}});
            if (url)
                return dispatch(push(url));
            if (user.role === SCOUT_ROLE)
                return dispatch(push('/search/player'));


            return dispatch(push(`/profile/${user.id}`));
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const confirm = token => dispatch => {
    dispatch(startLoading());

    return get(`/api/v2/profile/confirm-email/${token}`)
        .then(user => {
            dispatch(stopLoading());

            if ('error' in user) {
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});
            }

            auth(user.access_token);

            dispatch({
                type: SUCCESS_ALERT,
                payload: {message: 'Your account was confirmed successfully!'}
            });

            dispatch({type: LOGIN, payload: user});

            if (user.role === SCOUT_ROLE)
                return dispatch(push('/search/player'));

            return dispatch(push(`/profile/${user.id}`));
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const registerScout = (user, token) => dispatch => {
    dispatch(startLoading());

    return post('/api/v2/profile/signup-scout', user, {}, token)
        .then(user => {
            dispatch(stopLoading());

            if ('error' in user)
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});

            dispatch({
                type: SUCCESS_ALERT,
                payload: {message: 'An activation link has been sent to your email address.', autoHideDuration: 6000}
            });

            dispatch(push('/sign/result'))
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const registerPlayer = (user, token) => dispatch => {
    dispatch(startLoading());

    return post('/api/v2/profile/signup-player', user, {}, token)
        .then(user => {
            dispatch(stopLoading());

            if ('error' in user)
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});

            dispatch({
                type: SUCCESS_ALERT,
                payload: {message: 'An activation link has been sent to your email address.', autoHideDuration: 6000}
            });

            dispatch(push('/sign/result'))
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const logOut = (token) => dispatch => {
    dispatch(startLoading());
    if(window.Intercom) {
        Intercom('shutdown')
    }

    return get('/api/v2/profile/logout', {}, token)
        .then(() => {
            dispatch(stopLoading());
            //dispatch({type: SET_COOKIE, payload: {token:null}});
            auth('');
            dispatch({type: LOGOUT});
            dispatch(push('/sign/in'));
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const getCurrent = (token) => dispatch => {
    dispatch(startLoading());
    return get('/api/v2/profile/get', {}, token)
        .then(user => {
            dispatch(stopLoading());

            if ('error' in user) {
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});
            }

            if (user.length === 0 && token) {
                dispatch(logOut());
            }

            dispatch({type: SET_CURRENT, payload: user});
            dispatch({type: LOAD});
        })
        .catch((message) => {
            dispatch({type: LOAD});
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const getUser = (id, token) => dispatch => {
    dispatch(startLoading());
    //dispatch({type: SET_USER, payload: null});
    return get(`/api/v2/user/get/${id}`, {},token)
        .then(user => {
            dispatch(stopLoading());

            if ('error' in user)
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});

            dispatch({type: SET_USER, payload: user});
        })
        .catch((message) => {
            dispatch(stopLoading());
            if (message === 'Unauthorized') {
                auth('', location.pathname);
                dispatch({type: LOGOUT});
                dispatch(push('/sign/in'));
                dispatch({type: ERROR_ALERT, payload: {message: 'Please log in to see this user\'s profile.'}});
            } else {
                dispatch({type: ERROR_ALERT, payload: {message}});
            }


        })
};

export const update = (data, token) => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/profile/update`, data, {}, token)
        .then(user => {
            dispatch(stopLoading());

            if ('error' in user)
                return dispatch({type: ERROR_ALERT, payload: {message: user.error.message}});

            dispatch({type: SET_CURRENT, payload: user});
            dispatch(push(`/profile/${user.id}`));
            dispatch({type: SUCCESS_ALERT, payload: {message: 'Profile was updated successfully'}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());

        })
};

export const deleteProfile = (password, why, token) => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/profile/delete-profile`, {password, why}, {}, token)
        .then(result => {
            dispatch(stopLoading());

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
            dispatch(stopLoading());
        })
};


export const uploadPhoto = (file, token) => dispatch => {
    dispatch(startLoading());

    let form = new FormData();
    if (file)
        form.append('UploadForm', file);

    return postForm(`/api/v2/profile/image/profile`, form, {}, token)
        .then(result => {
            dispatch(stopLoading());

            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});
            dispatch({
                type: SET_CURRENT_PHOTO, payload: {
                    profile_picture: result.profile_picture,
                    profile_picture_mobile: result.profile_picture_mobile,
                    profile_picture_desktop: result.profile_picture_desktop
                }
            });
            if (file)
                dispatch({type: SUCCESS_ALERT, payload: {message: 'Profile picture was uploaded successfully'}});
            else
                dispatch({type: SUCCESS_ALERT, payload: {message: 'Profile picture was deleted successfully'}});

        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const addFavorite = (id, token) => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/activity/follow`, {id_user_player: id}, {}, token)
        .then(result => {
            dispatch(stopLoading());

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
            dispatch(stopLoading());
        })
};

export const removeFavorite = (id, token) => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/activity/unfollow`, {id_user_player: id}, {}, token)
        .then(result => {
            dispatch(stopLoading());

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
            dispatch(stopLoading());
        })
};

export const sendEmail = (id, subject, text, token) => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/message/send-email`, {recipient: id, subject, text}, {}, token)
        .then(result => {
            dispatch(stopLoading());

            if (result.success) {
                dispatch({type: INC_EMAIL_COUNT, payload: id});
                return dispatch({type: SUCCESS_ALERT, payload: {message: "Your message was successfully sent!"}});
            }

            return dispatch({type: ERROR_ALERT, payload: {message: "Your message wasn't sent!"}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const verifyScout = (phone, name, token) => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/message/verify-message`, {phone, coach: name}, {}, token)
        .then(result => {
            dispatch(stopLoading());

            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            dispatch({type: SET_CURRENT_PHONE, payload: phone});
            return dispatch({type: SUCCESS_ALERT, payload: {message: "Contact information successfully sent."}});

        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const changePassword = (password_old, password_new, token) => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/profile/change-password`, {password_old, password_new}, {}, token)
        .then(result => {
            dispatch(stopLoading());

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
            dispatch(stopLoading());
        })
};


export const report = (id_violator, type, message, token) => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/activity/report`, {id_violator, type, message}, {}, token)
        .then(result => {
            dispatch(stopLoading());

            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            return dispatch({
                type: SUCCESS_ALERT,
                payload: {message: "Thanks! We will review this profile and take any necessary action."}
            });
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const forgotPassword = (email, token) => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/profile/reset-password-request`, {email}, {}, token)
        .then(result => {
            dispatch(stopLoading());

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
            dispatch(stopLoading());
        })
};

export const forgotPasswordToken = (token, password, password_repeat, authorizationToken) => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/profile/reset-password/${token}`, {password, password_repeat}, {}, authorizationToken)
        .then(result => {
            dispatch(stopLoading());

            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            dispatch(push('/sign/in'));
            return dispatch({type: SUCCESS_ALERT, payload: {message: "Password was changed successfully!"}});
        })
        .catch((message) => {

            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const resetPassword = (token) => dispatch => {
    dispatch(startLoading());

    return get(`/api/v2/profile/temp-password`, {}, token)
        .then(result => {
            dispatch(stopLoading());

            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            return dispatch({type: SUCCESS_ALERT, payload: {message: "We emailed you a temporary password"}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const getFollowedList = (token) => dispatch => {
    dispatch({type: CLEAR_SHORTLIST});
    dispatch(startLoading());

    return get('/api/v2/activity/following', {}, token)
        .then(result => {
            dispatch(stopLoading());
            dispatch({type: SET_SHORTLIST, payload: result.activities})
        })
        .catch((message) => {
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};
