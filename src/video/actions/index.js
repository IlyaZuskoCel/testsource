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


export const fetchVideo = (id, token) => dispatch => {
    dispatch(startLoading());
    return get(`/api/v2/video/get/${id}`, {}, token)
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


const getStatusVideo = (id, status, type, token) => dispatch => {
    setTimeout(() => {
        get(`/api/v2/video/get/${id}`, {}, token)
            .then(video => {
                console.log(id, status, type, video.status === status);

                if (video.status === -1) {
                    dispatch(stopLoading());
                    dispatch({type: ERROR_ALERT, payload: {message: "Error"}});
                    return dispatch({type, payload: video});
                }

                if (video.status === status) {
                    dispatch(stopLoading());
                    return dispatch({type, payload: video});
                }
                return dispatch(getStatusVideo(id, status, type, token))
            })
    }, 1000);
};

export const upload = (file, token) => dispatch => {

    let form = new FormData();
    if (file)
        form.append('UploadForm', file);


    return uploadForm(`/api/v2/video/upload`, form, token,  (progress) => dispatch({
        type: SET_VIDEO_PROGRESS,
        payload: progress
    }))
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});
            dispatch({type: UPLOAD_VIDEO, payload: result});


            dispatch(getStatusVideo(result.id, VIDEO_STATUS.STATUS_CONVERT, UPLOAD_VIDEO, token));

        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};


export const postVideo = (data, token) => dispatch => {
    dispatch(startLoading());

    const overlayUri = data.overlayUri;
    return post(`/api/v2/video/update-video`, {...data, overlayUri: null, is_published: overlayUri ? 0 : 1}, {}, token)
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
                        return postForm(`/api/v2/video/overlay`, form, {}, token)
                    })
                    .then(() => {
                        dispatch(stopLoading());
                        dispatch({type: SET_VIDEO, payload: {}});
                        dispatch(push(`/profile/${result.id_user}`));
                        dispatch({
                            type: SUCCESS_ALERT,
                            payload: {message: 'Your video is being processed. We will send you an email once it\'s posted.'}
                        });
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

export const update = (data, token) => dispatch => {
    const overlayUri = data.overlayUri;
    dispatch(startLoading());

    return post(`/api/v2/video/update-video`, {...data, overlayUri: null}, {}, token)
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
                        return postForm(`/api/v2/video/overlay`, form, {}, token)
                    })
                    .then(() => {
                        dispatch(stopLoading());
                        dispatch({type: SET_VIDEO, payload: {}});
                        dispatch(push(`/profile/${result.id_user}`));
                        dispatch({
                            type: SUCCESS_ALERT,
                            payload: {message: 'Your video is being processed. We will send you an email once it\'s updated.'}
                        });
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

export const trim = (id_video, time_start, time_end, token) => dispatch => {
    dispatch(startLoading());
    return post(`/api/v2/video/trim`, {id_video, time_start, time_end}, {}, token)
        .then(result => {
            if ('error' in result)
                return dispatch({type: ERROR_ALERT, payload: {message: result.error.message}});
            dispatch({type: TRIM_VIDEO, payload: result});

            if (result.status === VIDEO_STATUS.STATUS_TRIMMED) {
                return dispatch(stopLoading());
            }

            dispatch(getStatusVideo(result.id, VIDEO_STATUS.STATUS_TRIMMED, TRIM_VIDEO, token));

        })
        .catch((message) => {
            if (message === 'Unauthorized') {
                dispatch(logOut());
            }
            dispatch({type: ERROR_ALERT, payload: {message}});
        })
};


export const deleteVideo = (id_video, token) => dispatch => {
    dispatch(startLoading());

    return post(`/api/v2/video/remove`, {id_video}, {}, token)
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

export const fetchTags = token => dispatch => {
    dispatch(startLoading());

    return get(`/api/v2/video/get-tags`, {}, token)
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

export const downloadVideo = (video, token) => dispatch => {
    let link = document.createElement("a");
    link.download = video.video_file_name;
    link.href = video.overlay_video_path || video.trim_video_file_path || video.video_path;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return get(`/api/v2/activity/download-video/${video.id}`, {}, token);
};

export const sharedCount = (videoId, token) => dispatch => {
    return get(`/api/v2/activity/share-video/${videoId}`, {}, token);
};