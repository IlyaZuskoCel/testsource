/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React from 'react';


import PrivateRoute from '../common/containers/PrivateRoute';
import DefaultLayout from '../common/containers/DefaultRoute'

import Add from './containers/Add';
import Edit from './containers/Edit';
import VideoItem from './containers/VideoItem';

const routes = [
    <PrivateRoute key="VideoAdd" path="/video/add" component={Add} hideBackgroundTopMobileHeader/>,
    <PrivateRoute key="VideoEdit" path="/video/edit/:id?" component={Edit} hideBackgroundTopMobileHeader/>,
    <DefaultLayout key="VideoItem" path="/profile/:id/video/:videoId" component={VideoItem} hideBackgroundTopHeader/>,
];

export default routes;
