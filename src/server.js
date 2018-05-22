import path from "path";//

import {renderToString} from "react-dom/server";
import React from 'react'
import {StaticRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {createExpressServer} from "create-react-server";
import Cookie from 'react-cookies';
import {SheetsRegistry} from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import preset from 'jss-preset-default';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';


import config from "../webpack.config";
import app from "./app";
import configureStore from "./store";

import theme from "./theme";
import template from "./template";

const NODE_ENV = process.env.NODE_ENV || 'development';


import {get} from "./common/helpers/api";

const options = {
    render: (req, res, initialProps, context) => {
        Cookie.setRawCookie(req.headers.cookie);
        const token = Cookie.load('token');
        return get('/api/v2/profile/get', {}, token)
            .then(user=>{
                const sheetsRegistry = new SheetsRegistry();
                const jss = create(preset());
                jss.options.createGenerateClassName = createGenerateClassName;
                const Theme = theme(new Map());

                const state = context.store ? context.store.getState() : {};

                if(token){
                    state.common = state.common || {};
                    state.common.cookies = state.common.cookies || {};
                    state.common.cookies.token = token;
                }

                if(user){
                    state.user = state.user || {};
                    state.user.current =  state.user.current || user;
                }

                const store = configureStore(state);
                const html = renderToString(React.createElement(
                    JssProvider,
                    {registry: sheetsRegistry, jss: jss},
                    React.createElement(
                        Provider,
                        {store: store},
                        React.createElement(
                            StaticRouter,
                            {location: req.url, context: context},
                            React.createElement(
                                Theme,
                                {},
                                options.app({
                                    props: initialProps,
                                    req: req,
                                    res: res,
                                    state: state
                                })
                            )
                        )
                    )
                ));
                const css = sheetsRegistry.toString();

                return {html, css}
            })

    },
    app,
    template,
    templatePath: path.join(config.output.path, 'index.html'),
    outputPath: config.output.path,
    port: process.env.PORT || 80,
    debug: NODE_ENV === 'development'
};


createExpressServer(options);
