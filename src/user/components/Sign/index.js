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

import PlayerForm from '../../containers/SignPlayerForm';
import ScoutForm from '../../containers/SignScoutForm';
import InForm from '../../containers/SignInForm';
import hockeyMen from './image/signup.jpg';

const styleSheet = createStyleSheet('Sign', theme => ({
    content: {
        maxWidth: 1168,
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
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
        [theme.breakpoints.up('sm')]: {
            lineHeight: '70px',
            height: 70,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 100,
            lineHeight: '140px',

        }
    },

    logoLink: {
        textDecoration: 'none',
        height: 70,
        [theme.breakpoints.up('sm')]: {
            margin: 60
        },
        [theme.breakpoints.down('sm')]: {
            height: 60,
        }
    },
    leftBg: {
        zIndex: 0,
        position: 'absolute',
        left: 0,
        top: 0,
        height: 70,

        [theme.breakpoints.up('sm')]: {
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
        [theme.breakpoints.up('sm')]: {
            backgroundColor: '#f5f5f5',
            transform: 'skew(-20deg)',
            width: 'calc( ( 100% - 1440px ) / 2 + 480px )',
            minWidth: 480,
            right: -20
        },

    },

    text: {
        [theme.breakpoints.down('sm')]: {
            color: '#ffffff'
        }
    },
    tabs: {
        borderBottom: 'solid 1px #cbcbcb60'
    },
    tabContent: {

        paddingTop: 88,
        paddingBottom: 72,
        [theme.breakpoints.up('sm')]: {
            paddingRight: 16,
            paddingLeft: 16,
        },
        [theme.breakpoints.up('md')]: {
            paddingRight: 88,
            paddingLeft: 16,
        },
        [theme.breakpoints.down('sm')]: {
            padding: 16,
            paddingTop: 48,
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
        [theme.breakpoints.down('sm')]: {
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
        [theme.breakpoints.down('sm')]: {
            marginRight: 16,

        }
    }
}));


class Sign extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChangeTab = (event, index) => {
        if (index === 0) {
            this.props.goLogin();
        } else {
            this.props.goRegister(this.props.user);
        }
    };
    handleRadio = (event, value) => {
        this.props.goRegister(value);
    };

    render() {
        const {classes, type, user} = this.props;

        return (<div>

            <Hidden xsDown>
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

                <Hidden smUp>
                    <div className={classes.headerTab}>
                        <a href="https://scoutzoo.com" className={classNames(classes.logoLink)}>
                            <Icon className={classes.logo}>scoutzoo-symbol</Icon>
                        </a>

                        <Tabs index={type === 'in' ? 0 : 1}
                              centered fullWidth
                              indicatorColor="white"
                              onChange={this.handleChangeTab}>
                            <Tab label={
                                <Typography className={classes.text} type="body2">
                                    Log In
                                </Typography>
                            }/>
                            <Tab label={
                                <Typography className={classes.text} type="body2">
                                    Sign up
                                </Typography>
                            }/>
                        </Tabs>
                    </div>
                </Hidden>


                <Grid container direction={'row'} className={classes.root}>
                    <Grid item xs={12} sm={8} md={6}>
                        <div className={classes.tabContent}>

                            <Hidden xsDown>

                                <Tabs index={type === 'in' ? 0 : 1}
                                      centered fullWidth
                                      className={classes.tabs}
                                      onChange={this.handleChangeTab}>
                                    <Tab label={
                                        <Typography className={classes.text} type="body2">
                                            Log In
                                        </Typography>
                                    }/>
                                    <Tab label={
                                        <Typography className={classes.text} type="body2">
                                            Sign up
                                        </Typography>
                                    }/>
                                </Tabs>
                            </Hidden>


                            {type === 'in' && (<InForm/>)}


                            {type === 'up' && (

                                <div className={classNames(classes.radioUserWrap)}>
                                    <Typography type="subheading" className={classes.radioLabel}>I am a</Typography>
                                    <RadioGroup
                                        selectedValue={this.props.user}
                                        onChange={this.handleRadio}
                                        className={classes.radioUser}>
                                        <FormControlLabel value="player" control={<Radio/>} label={
                                            <Typography type="body1">
                                                Player
                                            </Typography>
                                        }/>
                                        <FormControlLabel value="scout" control={<Radio/>} label={
                                            <Typography type="body1">
                                                Scout
                                            </Typography>
                                        }/>
                                    </RadioGroup>
                                </div>
                            )}

                            {type === 'up' && user === 'player' && (
                                <PlayerForm/>
                            )}
                            {type === 'up' && user === 'scout' && (
                                <ScoutForm/>
                            )}
                        </div>
                    </Grid>
                    <Grid item sm={4} md={6} hidden={{xsDown: true}}>
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

Sign.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(Sign);
