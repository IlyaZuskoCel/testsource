/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */

import {push, goBack} from 'react-router-redux';

import {get, post, postForm, uploadForm} from '../../common/helpers/api';


import {logOut} from '../../user/actions';


import {ERROR_ALERT, SUCCESS_ALERT} from '../../common/constants/actions';
import {
    SET_VIDEO,
    SET_TAGS,
    SET_VIDEO_FIELD,
    SET_VIDEO_PROGRESS,
    DELETE_VIDEO
} from '../constants/actions';


export const fetchVideo = id => dispatch => {
    dispatch({type: SET_VIDEO, payload: {}});
    return get(`/api/v2/video/get/${id}`)
        .then(video => {
            if ('error' in video)
                return dispatch({type: ERROR_ALERT, payload: {message: video.error.message}});
            dispatch({type: SET_VIDEO, payload: video});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const upload = file => dispatch => {


    let form = new FormData();
    if (file)
        form.append('UploadForm', file);


    return uploadForm(`/api/v2/video/upload`, form, (progress) => dispatch({
        type: SET_VIDEO_PROGRESS,
        payload: progress
    }))
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});
            dispatch({type: SET_VIDEO, payload: result});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })


};


export const postVideo = (data) => dispatch => {
    const overlayUri = data.overlayUri;
    return post(`/api/v2/video/update-video`, {...data, overlayUri: null})
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            if (overlayUri) {
                return fetch(overlayUri)
                    .then(res => res.blob())
                    .then(blob => {
                        let form = new FormData();
                        form.append('UploadForm', blob);
                        form.append('video_id', data.id);
                        return postForm(`/api/v2/video/overlay`, form)
                    })
                    .then(() => {
                        dispatch({type: SET_VIDEO, payload: {}});
                        dispatch(push('/profile'));
                        dispatch({type: SUCCESS_ALERT, payload: {message: 'Video was posted successfully'}});
                    })
                    .catch(console.log);
            }


            dispatch({type: SET_VIDEO, payload: {}});
            dispatch(push('/profile'));
            dispatch({type: SUCCESS_ALERT, payload: {message: 'Video was posted successfully'}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const update = (data) => dispatch => {
    const overlayUri = data.overlayUri;

    return post(`/api/v2/video/update-video`, {...data, overlayUri: null})
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            if (overlayUri) {
                return fetch(overlayUri)
                    .then(res => res.blob())
                    .then(blob => {
                        let form = new FormData();
                        form.append('UploadForm', blob);
                        form.append('video_id', data.id);
                        return postForm(`/api/v2/video/overlay`, form)
                    })
                    .then(() => {
                        dispatch({type: SET_VIDEO, payload: {}});
                        dispatch(push('/profile'));
                        dispatch({type: SUCCESS_ALERT, payload: {message: 'Video was updated successfully'}});
                    })
                    .catch(console.log);
            }
            dispatch({type: SET_VIDEO, payload: {}});
            dispatch(push('/profile'));
            dispatch({type: SUCCESS_ALERT, payload: {message: 'Video was updated successfully'}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};


export const deleteVideo = id_video => dispatch => {
    return post(`/api/v2/video/remove`, {id_video})
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            dispatch({type: DELETE_VIDEO, payload: id_video});
            dispatch({type: SUCCESS_ALERT, payload: {message: 'Video was deleted successfully'}});

        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};

export const updateVideoField = (field, value) => dispatch => {
    dispatch({type: SET_VIDEO_FIELD, payload: {field, value}});
};
export const clear = () => dispatch => {
    dispatch({type: SET_VIDEO, payload: {}});
};

export const fetchTags = () => dispatch => {
    return get(`/api/v2/video/get-tags`)
        .then(data => {
            if ('error' in data)
                return dispatch({type: ERROR_ALERT, payload: {message: data.error.message}});

            dispatch({type: SET_TAGS, payload: data});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};