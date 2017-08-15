/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React from 'react';


import PrivateRoute from '../common/containers/PrivateRoute'
import DefaultLayout from '../common/containers/DefaultRoute'

import Login from './containers/Login';
import Register from './containers/Register';
import Profile from './containers/Profile';
import Main from './containers/Main';

const routes = [
    <DefaultLayout key="1" path="/" component={Main}/>,
    <DefaultLayout key="2" path="/login" component={Login}/>,
    <DefaultLayout key="3" path="/register" component={Register}/>,
    <PrivateRoute key="4" path="/profile" component={Profile} hideBackgroundTopHeader/>
];

export default routes;
