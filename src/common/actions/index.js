/**
 * Created by aleksandr on 7/26/17.
 * moonion.com
 */

import {push as routerGo, goBack as routerBack} from 'react-router-redux';


export const go = page => dispatch => {
    dispatch(routerGo(page));
};

export const goBack = () => dispatch => {
    dispatch(routerBack());
};