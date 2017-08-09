/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';


import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Header from '../../containers/Header'
import Footer from '../../containers/Footer'

const styleSheet = createStyleSheet('DefaultRoute', theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: window.innerHeight,
        overflow: 'hidden',
        marginTop: 70,
        [theme.breakpoints.down('sm')]: {
            height: 60,
        }
    }
}));


const DefaultRoute = ({component: Component, isAuthenticated, classes, ...rest}) => (
    <Route {...rest} render={props => (
        <Grid className={classes.root}>
            <Header/>
            <Component {...props} />
            <Footer/>
        </Grid>
    )}/>
);

DefaultRoute.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(DefaultRoute);