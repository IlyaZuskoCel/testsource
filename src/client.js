import React, {Component} from "react";
import {render} from "react-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';

import createApp from "./app";
import configureStore from "./store";
import theme from "./theme";

const state = window.__INITIAL__STATE__;
const props = window.__INITIAL__PROPS__;
const history = createBrowserHistory();
const store = configureStore(state, {}, history);

const Theme = theme(new Map());

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
                <Theme>
                    {createApp({
                        state,
                        props
                    })}
                </Theme>
            </ConnectedRouter>
        </Provider>
    }
}



render((<App/>), document.getElementById('app'));
