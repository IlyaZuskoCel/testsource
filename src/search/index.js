/**
 * Created by kirill on 7/19/17.
 * moonion.com
 */

import React from 'react';

import DefaultRoute from '../common/containers/DefaultRoute'
import DefaultLayout from '../common/containers/DefaultRoute'

import Search from './containers/Search';

const routes = [
    <DefaultRoute key="Search" path="/search/:type?" component={Search} hideBackgroundTopMobileHeaderScroll/>
];

export default routes;