/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React from 'react';
import {Route} from 'react-router-dom';


import PrivateRoute from '../common/containers/PrivateRoute';
import DefaultLayout from '../common/containers/DefaultRoute';

import Add from './containers/Add';
import Edit from './containers/Edit';
import VideoItem from './containers/VideoItem';
import Player from './containers/Player';

const routes = [
    <PrivateRoute key="VideoAdd" path="/video/add" component={Add} hideBackgroundTopMobileHeader/>,
    <PrivateRoute key="VideoEdit" path="/video/edit/:id?" component={Edit} hideBackgroundTopMobileHeader/>,
    <Route key="VideoPlayer" path="/profile/:id/video/:videoId/player" component={Player}/>,
    <DefaultLayout key="VideoItem" path="/profile/:id/video/:videoId" component={VideoItem} hideBackgroundTopHeader/>,
];

export default routes;
