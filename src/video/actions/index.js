/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */

import {push, goBack} from 'react-router-redux';

import {get, post, postForm, uploadForm} from '../../common/helpers/api';


import {logOut} from '../../user/actions';
import {startLoading, stopLoading} from "../../common/actions/index";


import {ERROR_ALERT, SUCCESS_ALERT} from '../../common/constants/actions';
import {
    SET_VIDEO,
    UPLOAD_VIDEO,
    TRIM_VIDEO,
    SET_TAGS,
    SET_VIDEO_FIELD,
    SET_VIDEO_PROGRESS,
    DELETE_VIDEO
} from '../constants/actions';

import * as VIDEO_STATUS from '../constants/video';


export const fetchVideo = id => dispatch => {
    dispatch(startLoading());
    dispatch({type: SET_VIDEO, payload: {}});

    return get(`/api/v2/video/get/${id}`)
        .then(video => {
            dispatch(stopLoading());
            if ('error' in video)
                return dispatch({type: ERROR_ALERT, payload: {message: video.error.message}});
            dispatch({type: SET_VIDEO, payload: video});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};


const getStatusVideo = (id, status, type) => dispatch => {
    setTimeout(() => {
        get(`/api/v2/video/get/${id}`)
            .then(video => {
                console.log(id, status, type, video.status === status);
                if (video.status === status) {
                    dispatch(stopLoading());
                    return dispatch({type, payload: video});
                }
                return dispatch(getStatusVideo(id, status, type))
            })
    }, 1000);
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
            dispatch({type: UPLOAD_VIDEO, payload: result});


            dispatch(getStatusVideo(result.id, VIDEO_STATUS.STATUS_CONVERT, UPLOAD_VIDEO));

        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};


export const postVideo = (data) => dispatch => {
    dispatch(startLoading());

    const overlayUri = data.overlayUri;
    return post(`/api/v2/video/update-video`, {...data, overlayUri: null, is_published: overlayUri ? 0 : 1})
        .then(result => {
            dispatch(stopLoading());

            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});

            if (overlayUri) {
                dispatch(startLoading());

                return fetch(overlayUri)
                    .then(res => res.blob())
                    .then(blob => {

                        let form = new FormData();
                        form.append('UploadForm', blob);
                        form.append('video_id', data.id);
                        return postForm(`/api/v2/video/overlay`, form)
                    })
                    .then(() => {
                        dispatch(stopLoading());
                        dispatch({type: SET_VIDEO, payload: {}});
                        dispatch(push(`/profile/${result.id_user}`));
                        dispatch({type: SUCCESS_ALERT, payload: {message: 'You will receive email when video will be posted'}});
                    })
                    .catch(console.log);
            }

            dispatch({type: SET_VIDEO, payload: {}});
            dispatch(push(`/profile/${result.id_user}`));
            dispatch({type: SUCCESS_ALERT, payload: {message: 'Video was posted successfully'}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const update = (data) => dispatch => {
    const overlayUri = data.overlayUri;
    dispatch(startLoading());

    return post(`/api/v2/video/update-video`, {...data, overlayUri: null})
        .then(result => {
            dispatch(stopLoading());

            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});


            if (overlayUri) {
                dispatch(startLoading());

                return fetch(overlayUri)
                    .then(res => res.blob())
                    .then(blob => {
                        let form = new FormData();
                        form.append('UploadForm', blob);
                        form.append('video_id', data.id);
                        return postForm(`/api/v2/video/overlay`, form)
                    })
                    .then(() => {
                        dispatch(stopLoading());
                        dispatch({type: SET_VIDEO, payload: {}});
                        dispatch(push(`/profile/${result.id_user}`));
                        dispatch({type: SUCCESS_ALERT, payload: {message: 'Video was updated successfully'}});
                    })
                    .catch((message) => {
                        dispatch({type: ERROR_ALERT, payload: {message}});
                        dispatch(stopLoading());
                    })
            }
            dispatch({type: SET_VIDEO, payload: {}});
            dispatch(push(`/profile/${result.id_user}`));
            dispatch({type: SUCCESS_ALERT, payload: {message: 'Video was updated successfully'}});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};

export const trim = (id_video, time_start, time_end) => dispatch => {
    dispatch(startLoading());
    return post(`/api/v2/video/trim`, {id_video, time_start, time_end})
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});
            dispatch({type: TRIM_VIDEO, payload: result});

            if (result.status === VIDEO_STATUS.STATUS_TRIMMED) {
                return dispatch(stopLoading());
            }

            dispatch(getStatusVideo(result.id, VIDEO_STATUS.STATUS_TRIMMED, TRIM_VIDEO));

        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};


export const deleteVideo = id_video => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/video/remove`, {id_video})
        .then(result => {
            dispatch(stopLoading());

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
            dispatch(stopLoading());
        })
};

export const updateVideoField = (field, value) => dispatch => {
    dispatch({type: SET_VIDEO_FIELD, payload: {field, value}});
};
export const clear = () => dispatch => {
    dispatch({type: SET_VIDEO, payload: {}});
};

export const fetchTags = () => dispatch => {
    dispatch(startLoading());

    return get(`/api/v2/video/get-tags`)
        .then(data => {
            dispatch(stopLoading());

            if ('error' in data)
                return dispatch({type: ERROR_ALERT, payload: {message: data.error.message}});

            dispatch({type: SET_TAGS, payload: data});
        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
            dispatch(stopLoading());
        })
};