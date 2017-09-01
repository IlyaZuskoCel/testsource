/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React from 'react';


import PrivateRoute from '../common/containers/PrivateRoute'
import DefaultLayout from '../common/containers/DefaultRoute'

import Profile from './containers/Profile';
import Sign from './containers/Sign';
import Settings from './containers/Settings';
import Edit from './containers/Edit';
import Delete from './containers/Delete';
import ChangePassword from './containers/ChangePassword';

const routes = [
    <DefaultLayout key="Sign" path="/sign/:type/:user?" component={Sign} hideHeader/>,
    <PrivateRoute key="ChangePassword" path="/settings/password" component={ChangePassword} hideBackgroundTopMobileHeader/>,
    <PrivateRoute key="Settings" path="/settings" component={Settings} hideBackgroundTopMobileHeader/>,
    <PrivateRoute key="Edit" path="/profile/edit" component={Edit} hideBackgroundTopMobileHeader/>,
    <PrivateRoute key="Delete" path="/profile/delete" component={Delete}/>,
    <DefaultLayout key="Profile" path="/profile/:id" component={Profile} hideBackgroundTopHeader/>,
    <PrivateRoute key="CurrentProfile" path="/profile" component={Profile} hideBackgroundTopHeader/>,
];

export default routes;
