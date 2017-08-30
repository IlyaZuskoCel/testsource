/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


const getHeaders = () => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const token = localStorage.getItem('token');
    if (token)
        headers.append('Authorization', `Bearer ${token}`);

    return headers;
};

const getFormHeaders = () => {
    let headers = new Headers();

    const token = localStorage.getItem('token');
    if (token)
        headers.append('Authorization', `Bearer ${token}`);

    return headers;
};

export const get = (url, options) => {
    return fetch(url, {
        headers: getHeaders(),
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

export const post = (url, data, options = {}) => {

    return fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: getHeaders(),
        ...options,

    })
        .then(response => {
            if (response.status !== 200) {
                throw 'error';
            }
            return response.json();
        })
};


export const postForm = (url, form, options = {}) => {

    return fetch(url, {
        method: 'post',
        body: form,
        headers: getFormHeaders(),
        ...options,

    })
        .then(response => {
            if (response.status !== 200) {
                throw 'error';
            }
            return response.json();
        })
};

export const getPage = (url, options) => {
    return fetch(url, {
        headers: getHeaders(),
        ...options,

    })
        .then(response => {
            if (response.status !== 200) {
                throw 'error';
            }

            return response.json().then(items => ({
                items,
                count:response.headers.get('X-Pagination-Total-Count'),
                pageCount:response.headers.get('X-Pagination-Page-Count'),
                page:response.headers.get('X-Pagination-Current-Page'),
                perPage:response.headers.get('X-Pagination-Per-Page'),
            }));
        })
};

export const auth = token => {
    if (token)
        localStorage.setItem('token', token);
    else
        localStorage.removeItem('token');
};
