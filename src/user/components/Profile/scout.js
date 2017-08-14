/**
 * Created by aleksandr on 8/11/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import Grid from 'material-ui/Grid';


import scoutBg from './assets/images/profile-scout-background.jpg';



const styleSheet = createStyleSheet('Profile', theme => ({
    root: {},
    content: {
        maxWidth: 1440,
        width: '100%',
        margin: 'auto'
    },
    backgroundImg: {
        zIndex: -1,
        minWidth: '100%',
        height: 688,
        [theme.breakpoints.down('sm')]: {
            height: 536,
        },
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.5,
        backgroundImage: 'linear-gradient(196deg, #f3f3f3, rgba(255, 255, 255, 0.74) 53%, rgba(250, 250, 250, 0.86) 74%, #f3f3f3)',

    },
    backgroundLeft: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        width: 'calc( ( 100% - 1440px ) / 2 + 786px )',
        minWidth: 196,
        right: 'calc( ( 100% - 1440px ) / 2 + 872px)',

        height: 688,

        [theme.breakpoints.down('lg')]: {
            right: 792,
        },
        [theme.breakpoints.down('md')]: {
            right: 600,
        },


        [theme.breakpoints.down('sm')]: {
            height: 536,
            right: 404,
            opacity: 0.8

        },

        [theme.breakpoints.down('xs')]: {
            height: 536,
            right: 304,
            opacity: 0.8

        },

        backgroundImage: 'linear-gradient(311deg, #f55e58, #c9011b)',
        transform: 'skew(-20deg)',
    },

    backgroundRight: {
        zIndex: -1,
        backgroundColor: '#f5f5f5',
        backgroundImage: 'linear-gradient(196deg, #f3f3f3, rgba(255, 255, 255, 0.74) 53%, rgba(250, 250, 250, 0.86) 74%, #f3f3f3)',

        position: 'absolute',
        top: 0,
        right: 'calc( ( 100% - 1440px ) / 2 + 120px)',
        width: 752,
        height: 688,
        opacity: 0.8,

        [theme.breakpoints.down('lg')]: {
            right: 40,
        },

        [theme.breakpoints.down('md')]: {
            width: 560,
        },

        [theme.breakpoints.down('sm')]: {
            height: 536,
            width: 364,
        },

        [theme.breakpoints.down('xs')]: {
            height: 536,
            width: 264,
        },
        transform: 'skew(-20deg)',
    },
    backgroundCenter: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 688,
        [theme.breakpoints.down('sm')]: {
            height: 536,
        },

        backgroundImage: 'linear-gradient(196deg, #f3f3f3, rgba(255, 255, 255, 0.74) 53%, rgba(250, 250, 250, 0.86) 74%, #f3f3f3)',
    },
}));


class ScoutProfile extends Component {


    render() {

        const {classes, user} = this.props;

        return <Grid container gutter={8} className={classes.root}>
            <img className={classes.backgroundImg} src={scoutBg}/>

            <div className={classes.backgroundRight}/>
            <div className={classes.backgroundLeft}/>

            <Grid item className={classes.content}>
                <Typography type="headline">{this.props.user.username}</Typography>
            </Grid>

        </Grid>

    }
}

ScoutProfile.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ScoutProfile);