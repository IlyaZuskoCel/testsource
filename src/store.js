import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import thunk from "redux-thunk";

import CommonReducer from './common/reducers';
import UserReducer from './user/reducers';
import VideoReducer from './video/reducers';
import SerachReducer from './search/reducers';

const isBrowser = (typeof window !== 'undefined');
const NODE_ENV = process.env.NODE_ENV || 'development';

export default (initialState, {req, res} = {}, history) => {

    if (!initialState && req) {
        initialState = {};
    }

    let middlewares = [
        thunk
    ];

    if (isBrowser) {
        middlewares.push(routerMiddleware(history));
    }

    return createStore(
        combineReducers({
            common: CommonReducer,
            user: UserReducer,
            video: VideoReducer,
            search: SerachReducer,
            router: routerReducer
        }),
        initialState,
        compose(
            applyMiddleware(...middlewares),
            isBrowser && NODE_ENV === 'development' && window['devToolsExtension'] ? window['devToolsExtension']() : f => f
        )
    );

}
