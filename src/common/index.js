/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React from 'react';


import PrivateRoute from './containers/PrivateRoute'
import DefaultLayout from './containers/DefaultRoute'

import NoMatch from './components/NoMatch';
import Typography from './components/Typography';
import Form from './components/Form';

const routes = [
    <DefaultLayout key="1" path="/typography" component={Typography}/>,
    <DefaultLayout key="2" path="/form" component={Form}/>,
    <DefaultLayout key="20" component={NoMatch}/>
];

export default routes;