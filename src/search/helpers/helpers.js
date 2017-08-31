/**
 * Created by kirill on 7/31/17.
 * moonion.com
 */

export const addRequestParams = (url , params) => {
    if (Object.keys(params).length === 0) {
        return url;
    }

    let composedUrl = url + '?';

    for (let key in params) {
        composedUrl += `${key}=${params[key]}&`;
    }

    return composedUrl.slice(0 , composedUrl.length - 1);
};


export const filterOnReg = (reg , string) => {
    return reg.test(string) ? string : '';
};