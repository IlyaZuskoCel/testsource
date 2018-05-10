/**
 * Created by kirill on 7/19/17.
 * moonion.com
 */

import React from 'react';
import { Redirect } from 'react-router'

import DefaultRoute from '../common/containers/DefaultRoute'

import Search from './containers/Search';

const routes = [
        <Redirect exact from="/" to="/search" key="Search"/>,
        <DefaultRoute path="/search/:type?" component={Search} hideBackgroundTopMobileHeaderScroll key="Search"/>
];

export default routes;