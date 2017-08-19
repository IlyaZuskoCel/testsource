/**
 * Created by aleksandr on 7/20/17.
 * moonion.com
 */

import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import Typography from 'material-ui/Typography';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import {Link, Icon} from '../'


const styleSheet = createStyleSheet('Footer', theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 200,
        backgroundColor: '#f5f5f5',

        zIndex: 1,
        [theme.breakpoints.down('sm')]: {
            height: 376,
            position: 'absolute',
            width: '100%',
            bottom: -634,
        },


    },
    logo: {
        fontSize: 60,
        color: '#444444',
        [theme.breakpoints.down('md')]: {
            fontSize: 40,
        }
    },
    footer: {
        paddingTop: 24,
        maxWidth: 1440,
        paddingLeft: 104,
        paddingRight: 104,
        [theme.breakpoints.down('md')]: {
            paddingLeft: 32,
            paddingRight: 32,
        }
    },
    links: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',

        maxWidth: 760,
        margin: 'auto',
        [theme.breakpoints.up('md')]: {
            alignItems: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        }
    },
    link: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 20
        }
    },
    followContainer: {
        display: 'flex',
        flexDirection: 'row',

        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end',
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'flex-start',
        }

    },
    followContainerLinks: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 120,
    },
    logoSkyrocketContainer: {
        maxWidth: 1400,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 24,
    },
    logoSkyrocket: {
        fontSize: 24,
        opacity: 0.6,
        color: '#444444',
        marginLeft: 3
    },
    socialLogo: {
        fontSize: 22,
        color: '#9b9b9b'
    }
}));


const Footer = ({user, classes}) => (
    <footer className={classes.root}>
        <Grid container gutter={8} className={classes.footer}>
            <Grid item xs={6} sm={4} md={2} lg={2}>
                <Link to="/" className={classes.logoLink} disabledUnderline>
                    <Icon className={classes.logo}>scoutzoo-symbol</Icon>
                </Link>
            </Grid>
            <Grid item xs={6} sm={8} md={6} lg={8} className={classes.links}>
                <Link to="/about" disabledUnderline className={classes.link}>
                    <Typography type="caption">About Us</Typography>
                </Link>
                <Link to="/contact" disabledUnderline className={classes.link}>
                    <Typography type="caption">Contact Us</Typography>
                </Link>
                <Link to="/privacy" disabledUnderline className={classes.link}>
                    <Typography type="caption">Privacy Policy</Typography>
                </Link>
                <Link to="/terms" disabledUnderline className={classes.link}>
                    <Typography type="caption">Terms & Conditions</Typography>
                </Link>
            </Grid>
            <Grid item xs={6} sm={10} md={2} lg={1} className={classes.followContainer}>
                <Typography type="caption">
                    Follow Us On
                </Typography>
            </Grid>
            <Grid item xs={6} sm={2} md={1} lg={1} className={classes.followContainerLinks}>
                <Link to="/" disabledUnderline>
                    <Icon className={classes.socialLogo}>facebook-filled</Icon>
                </Link>
                <Link to="/" disabledUnderline>
                    <Icon className={classes.socialLogo}>twitter-fill</Icon>
                </Link>
                <Link to="/" disabledUnderline>
                    <Icon className={classes.socialLogo}>instagram-fill</Icon>
                </Link>

            </Grid>
        </Grid>
        <Grid container gutter={8} className={classes.logoSkyrocketContainer}>
            <Typography type="caption">
                Copyright © Scout Zoo. Built by
            </Typography>
            <Icon className={classes.logoSkyrocket}>skyrocket-avatar</Icon>
        </Grid>
    </footer>
);

Footer.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Footer);