/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import DefaultLayout from '../../containers/DefaultRoute';

const PrivateRoute = ({component: Component, isAuthenticated, hideBackgroundTopHeader, hideBackgroundTopMobileHeader, hideBoxShadowScroll, hideBackgroundTopMobileHeaderScroll, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <DefaultLayout component={Component}
                           hideBackgroundTopHeader={hideBackgroundTopHeader}
                           hideBackgroundTopMobileHeader={hideBackgroundTopMobileHeader}
                           hideBackgroundTopMobileHeaderScroll={hideBackgroundTopMobileHeaderScroll}
                           hideBoxShadowScroll={hideBoxShadowScroll}
                           {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/search',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

export default PrivateRoute;