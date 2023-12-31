/**
 * Created by aleksandr on 7/15/17.
 * moonion.com
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Theme from './theme';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider, connect} from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import {Route, Switch, Link} from 'react-router-dom';

import {ConnectedRouter, routerReducer, routerMiddleware, push, goBack} from 'react-router-redux';

import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'


import ScrollToTop from './common/components/ScrollToTop';

import CommonReducer from './common/reducers';
import UserReducer from './user/reducers';
import VideoReducer from './video/reducers';
import SerachReducer from './search/reducers';

import CommonRouters from './common';
import UserRouters from './user';
import VideoRouters from './video';
import SearchRouters from './search';

import {getCurrent as getCurrentUser} from './user/actions'


const history = createHistory();


const AppReducer = combineReducers({
    common: CommonReducer,
    user: UserReducer,
    video: VideoReducer,
    search: SerachReducer,
    router: routerReducer
});

const store = createStore(AppReducer, undefined,
    composeWithDevTools(
        applyMiddleware(thunk, routerMiddleware(history)),
    ));

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getCurrentUser();
    }

    render() {
        if (!this.props.load)
            return null;

        return <ConnectedRouter history={history}>
            <ScrollToTop>
                <Switch>
                    {UserRouters}
                    {VideoRouters}
                    {SearchRouters}
                    {CommonRouters}
                </Switch>
            </ScrollToTop>
        </ConnectedRouter>
    }
}

const LayoutRedux = connect(
    state => ({
        load: state.common.load
    }),
    dispatch => ({
        getCurrentUser: () => dispatch(getCurrentUser()),
    })
)(Layout);


ReactDOM.render(
    <Theme>

        <Provider store={store}>
            <LayoutRedux/>
        </Provider>

    </Theme>,
    document.getElementById('app')
);