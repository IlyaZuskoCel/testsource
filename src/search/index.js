/**
 * Created by kirill on 7/19/17.
 * moonion.com
 */

import React from 'react';
import {Switch, Route, Redirect } from 'react-router'

import DefaultRoute from '../common/containers/DefaultRoute'

import Search from './containers/Search';

const routes = [
    <Switch key="Search">
        <Redirect exact from="/" to="/search"/>
        <DefaultRoute path="/search/:type?" component={Search} hideBackgroundTopMobileHeaderScroll/>
    </Switch>

];

export default routes;