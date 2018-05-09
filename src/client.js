import React, {Component} from "react";
import {render} from "react-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';

import createApp from "./app";
import configureStore from "./store";

const state = window.__INITIAL__STATE__;
const props = window.__INITIAL__PROPS__;
const history = createBrowserHistory();
const store = configureStore(state, {}, history);



class App extends Component {
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return <Provider store={store}>
            <ConnectedRouter history={history}>
                    {createApp({
                        state,
                        props
                    })}
            </ConnectedRouter>
        </Provider>
    }
}



render((<App/>), document.getElementById('app'));
