/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */
import cookie from 'react-cookies';

const fetch = typeof window === 'undefined' ? require('node-fetch') : window.fetch;
const DOMAIN_URL = typeof window === 'undefined' ? "http://nginx" : "";
const getHeaders = (token) => {
    let headers = {'Content-Type': 'application/json'};
    if (token)
        headers['Authorization'] = `Bearer ${token}`;
    return headers;
};


export const get = (url, options, token) => {
    console.log(url);

    return fetch(`${DOMAIN_URL}${url}`, {
        headers: getHeaders(token),
        ...options,

    })
        .then(response => {

            if (response.status === 401) {
                throw 'Unauthorized';
            }
            if (response.status !== 200) {
                throw response.message || 'error';
            }
            return response.json();
        })
        .then(resp=>{
            return resp;
        })
};

export const post = (url, data, options = {}, token) => {

    return fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: getHeaders(token),
        ...options,

    })
        .then(response => {
            if (response.status === 401) {
                throw 'Unauthorized';
            }
            if (response.status !== 200) {
                throw response.message || 'error';
            }
            return response.json();
        })
};


export const postForm = (url, form, options = {}, token) => {

    return fetch(url, {
        method: 'post',
        body: form,
        headers: {'Authorization': `Bearer ${token}`},
        ...options,

    })
        .then(response => {
            if (response.status === 401) {
                throw 'Unauthorized';
            }
            if (response.status !== 200) {
                throw response.message || 'error';
            }
            return response.json();
        })
};

export const uploadForm = (url, form, token,  onProgress) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', url, true);

        if (token)
            request.setRequestHeader('Authorization', `Bearer ${token}`);

        request.upload.addEventListener("loadstart", (event) => onProgress(0));
        request.upload.addEventListener("progress", (event) => onProgress(event.loaded / event.total));
        request.upload.addEventListener("load", (event) => onProgress(event.loaded / event.total));
        request.addEventListener("readystatechange", () => request.readyState === 4 && request.status === 200 ? resolve(JSON.parse(request.responseText)) : null);
        request.addEventListener("error", reject);
        request.addEventListener("abort", reject);

        request.send(form);
    });
};


export const getPage = (url, options, token) => {
    return fetch(url, {
        headers: getHeaders(token),
        ...options,

    })
        .then(response => {
            if (response.status === 401) {
                throw  'Unauthorized';
            }
            if (response.status !== 200) {
                throw response.message || 'error';
            }

            return response.json().then(items => ({
                items,
                count: response.headers.get('X-Pagination-Total-Count'),
                pageCount: response.headers.get('X-Pagination-Page-Count'),
                page: response.headers.get('X-Pagination-Current-Page'),
                perPage: response.headers.get('X-Pagination-Per-Page'),
            }));
        })
};


export const auth = (token, url) => {
    if (token)
        cookie.save('token', token, {path:'/'});
    else
        cookie.remove('token', {path:'/'});

    const lastUrl = cookie.load('lastUrl');
    if (url)
        cookie.save('lastUrl', url, {path:'/'});
    else
        cookie.remove('lastUrl', {path:'/'});
    return lastUrl;

};


export const getAuth = () => {
    return typeof window === 'undefined' ? false : cookie.load('token');
};