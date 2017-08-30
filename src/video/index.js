/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React from 'react';


import PrivateRoute from '../common/containers/PrivateRoute';

import Add from './containers/Add';
import Edit from './containers/Edit';

const routes = [
    <PrivateRoute key="ChangePassword" path="/video/add" component={Add}/>,
    <PrivateRoute key="Profile" path="/video/edit/:id?" component={Edit}/>,
];

export default routes;
