/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React from 'react';


import PrivateRoute from '../common/containers/PrivateRoute'
import DefaultLayout from '../common/containers/DefaultRoute'

import Profile from './containers/Profile';
import Sign from './containers/Sign';

const routes = [
    <DefaultLayout key="1" path="/sign/:type" component={Sign}/>,
    <PrivateRoute key="2" path="/profile/:id?" component={Profile} hideBackgroundTopHeader/>
];

export default routes;
