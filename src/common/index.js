/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React from 'react';

import {Redirect} from 'react-router-dom'
import PrivateRoute from './containers/PrivateRoute'
import DefaultLayout from './containers/DefaultRoute'

import NoMatch from './containers/NoMatch';
import Typography from './components/Typography';
import Form from './components/Form';

const routes = [
    <DefaultLayout key="typography" path="/typography" component={Typography}/>,
    <DefaultLayout key="form" path="/form" component={Form}/>,
    <PrivateRoute key="NoMatch" component={NoMatch}/>,

];

export default routes;

