/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';


import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';


import Header from '../../containers/Header'
import Footer from '../../containers/Footer'

import ScoutIcon from '../Icon';

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
    },
    message: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    alertIcon: {
        marginRight: 24
    }
}));


const DefaultRoute = ({component: Component, isAuthenticated, alert, hideAlert, classes, ...rest}) => (
    <Route {...rest} render={props => (
        <div>

            <Grid className={classes.root}>

                <Header/>
                <Component {...props} />
                <Footer/>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                // autoHideDuration={6e3}
                onRequestClose={hideAlert}
                open={alert.open}
                message={<div className={classes.message}>
                    <ScoutIcon className={classes.alertIcon}
                               color={alert.type}>{alert.type === 'error' ? 'cross' : 'checkmark'}</ScoutIcon>
                    <Typography type="body2"> {alert.message}</Typography>

                </div>}

            />
        </div>
    )}/>
);

DefaultRoute.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(DefaultRoute);