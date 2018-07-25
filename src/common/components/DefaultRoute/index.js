/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';

import Header from '../../containers/Header'
import Footer from '../../containers/Footer'

import {absUrl} from '../../helpers';
import ScoutIcon from '../Icon';

const styleSheet = createStyleSheet('DefaultRoute', theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        overflowX: 'hidden',
        paddingTop: 70,
        [theme.breakpoints.up('md')]: {
            minHeight: "calc( 100vh - 70px)",
        },
        [theme.breakpoints.down('md')]: {
            minHeight: "calc( 100vh - 60px)",
            paddingTop: 60,
        }
    },

    message: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        borderBottomColor: 'rgba(215,0,30, 0.15)',
        borderLeftColor: 'rgba(215,0,30, 0.65)',
        borderRightColor: 'rgba(215,0,30, 0.15)',
        animation: 'spinner 3000ms linear infinite',
    },
    '@keyframes spinner': {
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        }
    },
}));


const DefaultRoute = ({component: Component, isAuthenticated, loader, alert, hideAlert, classes, hideBackgroundTopHeader, hideBackgroundTopMobileHeader, hideBackgroundTopMobileHeaderScroll, hideBoxShadowScroll, hideHeader, ...rest}) => (
    <Route {...rest} render={props => {

        if (props.staticContext)
            props.staticContext.routeProps = rest;

        return (
            <div>
                <Helmet titleTemplate="%s | Scout Zoo">
                    <meta property="og:url" content={absUrl('/')}/>
                    <meta property="og:type" content="website"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/public/favicons/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/public/favicons/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/public/favicons/favicon-16x16.png"/>
                    <link rel="manifest" href="/public/favicons/manifest.json"/>
                    <link rel="mask-icon" href="/public/favicons/safari-pinned-tab.svg" color="#d71f27 "/>
                    <link rel="shortcut icon" href="/public/favicons/favicon.ico"/>
                    <meta name="msapplication-config" content="/public/favicons/browserconfig.xml"/>
                    <meta name="theme-color" content="#D71F27"/>
                    <meta name="theme-color" content="#D7001E"/>
                    <meta name="msapplication-navbutton-color" content="#D7001E"/>
                    <meta name="apple-mobile-web-app-status-bar-style" content="#D7001E"/>
                </Helmet>
                <Grid
                    className={classNames(classes.root, {[classes.hideBackgroundTopHeader]: hideBackgroundTopHeader || hideBackgroundTopMobileHeader})}>
                    {!hideHeader && <Header hideBackgroundTopHeader={hideBackgroundTopHeader}
                                            hideBackgroundTopMobileHeaderScroll={hideBackgroundTopMobileHeaderScroll}
                                            hideBackgroundTopMobileHeader={hideBackgroundTopMobileHeader}
                                            hideBoxShadowScroll={hideBoxShadowScroll}/>}
                    <Component {...rest} {...props} />
                    <Footer/>
                </Grid>
                {typeof alert.message === "string" && (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                        onClick={hideAlert}
                        autoHideDuration={typeof alert.autoHideDuration === "undefined" ? 5000 : alert.autoHideDuration}
                        onRequestClose={(e, reason) => reason === 'timeout' ? hideAlert() : null}
                        open={alert.open}
                        message={<div className={classes.message}>
                            <ScoutIcon className={classes.alertIcon}
                                       color={alert.type}>{alert.type === 'error' ? 'cross' : 'checkmark'}</ScoutIcon>
                            <Typography type="body2">{alert.message}</Typography>

                        </div>}
                    />
                )}
                <div
                    className={classNames(classes.preloader, loader > 0 ? classes.showPreloader : classes.hidePreloader)}>
                    <div className={classes.spinner}/>
                </div>
            </div>
        )
    }}/>
);

DefaultRoute.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(DefaultRoute);
