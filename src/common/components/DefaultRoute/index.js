/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';

import Header from '../../containers/Header'
import Footer from '../../containers/Footer'

 import gifImage from './assets/images/spinner.gif';

import ScoutIcon from '../Icon';

const styleSheet = createStyleSheet('DefaultRoute', theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        overflowX: 'hidden',
        paddingTop: 70,
        [theme.breakpoints.up('sm')]: {
            minHeight: window.innerHeight - 70,
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: 60,
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
    },
    hideBackgroundTopHeader: {
        marginTop: 0,
    },
    showPreloader: {
        display: 'block'
    },
    hidePreloader: {
        display: 'none',
        visibility: 'hidden',
        height: 0,
        width: 0,
    },
    preloader: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gifImage: {
        width: 50,
    },
    spinner: {
        width: 35,
        height: 35,
        display: 'block',
        borderRadius: '100%',
        border: '2px solid',
        borderTopColor: 'rgba(215,0,30, 0.65)',
        borderBottomColor:'rgba(215,0,30, 0.15)',
        borderLeftColor:'rgba(215,0,30, 0.65)',
        borderRightColor:'rgba(215,0,30, 0.15)',
        animation: 'spinner 3000ms linear infinite',
},
    '@keyframes spinner': {
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        }
    }
}));

const DefaultRoute = ({component: Component, isAuthenticated, loader ,alert, hideAlert, classes, hideBackgroundTopHeader, hideBackgroundTopMobileHeader, hideBackgroundTopMobileHeaderScroll, hideBoxShadowScroll ,  hideHeader, ...rest}) => (
    <Route {...rest} render={props => (
        <div>
            <Grid
                className={classNames(classes.root, {[classes.hideBackgroundTopHeader]: hideBackgroundTopHeader || hideBackgroundTopMobileHeader})}>
                {!hideHeader && <Header hideBackgroundTopHeader={hideBackgroundTopHeader}
                                        hideBackgroundTopMobileHeaderScroll={hideBackgroundTopMobileHeaderScroll}
                                        hideBackgroundTopMobileHeader={hideBackgroundTopMobileHeader}
                                        hideBoxShadowScroll={hideBoxShadowScroll}/>}
                <Component {...props} />
                <Footer/>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={typeof alert.autoHideDuration  === "undefined" ? 3000 : alert.autoHideDuration}
                onRequestClose={hideAlert}
                open={alert.open}
                message={<div className={classes.message} onClick={hideAlert}>
                    <ScoutIcon className={classes.alertIcon}
                               color={alert.type}>{alert.type === 'error' ? 'cross' : 'checkmark'}</ScoutIcon>
                    <Typography type="body2"> {alert.message}</Typography>

                </div>}
            />
            <div className={classNames(classes.preloader , loader > 0 ? classes.showPreloader : classes.hidePreloader)}>
                <div className={classes.spinner}/>
            </div>
        </div>
    )}/>
);

DefaultRoute.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(DefaultRoute);
