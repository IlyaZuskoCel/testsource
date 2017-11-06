import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';

import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';


import {Link, Icon} from '../../../common/components';

import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';

import hockeyMen from './assets/image/image.jpg';

const styleSheet = createStyleSheet('Forgot', theme => ({
    content: {
        maxWidth: 1168,
        margin: 'auto',
        [theme.breakpoints.down('md')]: {
            marginTop: 0,
        },
    },
    header: {
        marginTop: -70,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 70,


    },
    headerTab: {
        textAlign: 'center',
        marginTop: -60,
        backgroundImage: 'linear-gradient(298deg, #f55e58, #c9011b)',
        boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.3)',
        marginBottom: 8
    },
    rootHeader: {
        maxWidth: 1440,
        zIndex: 0,
    },

    logo: {
        fontSize: 26,
        color: '#fff',
        [theme.breakpoints.up('md')]: {
            lineHeight: '70px',
            height: 70,
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 100,
            lineHeight: '140px',

        }
    },

    logoLink: {
        textDecoration: 'none',
        height: 70,
        [theme.breakpoints.up('md')]: {
            margin: 60
        },
        [theme.breakpoints.down('md')]: {
            height: 60,
        }
    },
    leftBg: {
        zIndex: 0,
        position: 'absolute',
        left: 0,
        top: 0,
        height: 70,

        [theme.breakpoints.up('md')]: {
            backgroundImage: 'linear-gradient(290deg, #f55e58, #c9011b)',
            transform: 'skew(-20deg)',
            width: 'calc( ( 100% - 1440px ) / 2 + 196px )',
            minWidth: 196,
            left: -20
        },


    },
    rightBg: {
        zIndex: 0,
        position: 'absolute',
        top: 0,
        height: 70,
        [theme.breakpoints.up('md')]: {
            backgroundColor: '#f5f5f5',
            transform: 'skew(-20deg)',
            width: 'calc( ( 100% - 1440px ) / 2 + 480px )',
            minWidth: 480,
            right: -20
        },

    },

    text: {
        [theme.breakpoints.down('md')]: {
            color: '#ffffff'
        }
    },
    tabs: {
        borderBottom: 'solid 1px #cbcbcb60'
    },
    tabContent: {

        paddingTop: 88,
        paddingBottom: 72,
        [theme.breakpoints.up('md')]: {
            paddingRight: 16,
            paddingLeft: 16,
        },
        [theme.breakpoints.up('lg')]: {
            paddingRight: 88,
            paddingLeft: 16,
        },
        [theme.breakpoints.down('md')]: {
            padding: 16,
            paddingBottom: 56,
        }

    },
    hockeyMen: {
        position: 'absolute',
        height: 842,
        maxHeight: window.innerHeight - 60,
    },
    hockeyMenWrap: {
        position: 'relative',
    },
    radioUserWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 64,
        [theme.breakpoints.down('md')]: {
            marginTop: 0,

        }
    },
    radioUser: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    radioLabel: {
        marginRight: 40,
        [theme.breakpoints.down('md')]: {
            marginRight: 16,

        }
    }
}));


class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {classes, type, token} = this.props;

        return (<div>

            <Hidden only={['xs', 'sm']}>
                <div className={classNames(classes.header)}>
                    <div className={classes.leftBg}/>
                    <div className={classes.rightBg}/>
                    <Grid container gutter={8} className={classes.rootHeader}>
                        <Grid item xs={4}>
                            <a href="https://scoutzoo.com"
                               className={classNames(classes.logoLink)}>
                                <Icon className={classes.logo}>scoutzoo-symbol</Icon>
                            </a>
                        </Grid>
                    </Grid>
                </div>
            </Hidden>

            <div className={classes.content}>

                <Hidden only={['md', 'lg', 'xl']}>
                    <div className={classes.headerTab}>
                        <a href="https://scoutzoo.com" className={classNames(classes.logoLink)}>
                            <Icon className={classes.logo}>scoutzoo-symbol</Icon>
                        </a>
                    </div>
                </Hidden>


                <Grid container>
                    <Grid item xs={12} md={6}>
                        <div className={classes.tabContent}>
                            {token ? (
                                <PasswordForm token={token} submit={this.props.changePassword}
                                              cancel={this.props.cancel}/>
                            ) : (
                                <EmailForm submit={this.props.sendEmail} cancel={this.props.cancel}/>
                            )}
                        </div>
                    </Grid>
                    <Grid item sm={4} md={6} hidden={{mdDown: true}}>
                        <div className={classes.hockeyMenWrap}>
                            <img className={classes.hockeyMen}
                                 src={hockeyMen}/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>);
    }
}

Forgot.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(Forgot);
