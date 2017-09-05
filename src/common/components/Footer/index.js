/**
 * Created by aleksandr on 7/20/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';


import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';


import {PLAYER_ROLE, SCOUT_ROLE} from '../../../user/constants';

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
        textDecoration: 'none',
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
    followLink: {
        textDecoration: 'none',
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

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {user, classes} = this.props;
        return (
            <footer className={classes.root}>
                <Grid container gutter={8} className={classes.footer}>
                    <Grid item xs={6} sm={4} md={2} lg={2}>
                        <Link to={user && user.role === SCOUT_ROLE ? '/search/player' : '/profile'}
                              className={classes.logoLink} disabledUnderline>
                            <Icon className={classes.logo}>scoutzoo-symbol</Icon>
                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={8} md={6} lg={8} className={classes.links}>
                        <a href="https://scoutzoo.com/aboutus" target="_blank" className={classes.link}>
                            <Typography type="caption">About Us</Typography>
                        </a>
                        <a href="https://scoutzoo.com/contact" target="_blank" className={classes.link}>
                            <Typography type="caption">Contact Us</Typography>
                        </a>
                        <a href="https://scoutzoo.com/policy" target="_blank" className={classes.link}>
                            <Typography type="caption">Privacy Policy</Typography>
                        </a>
                        <a href="https://scoutzoo.com/term" target="_blank" className={classes.link}>
                            <Typography type="caption">Terms & Conditions</Typography>
                        </a>
                    </Grid>
                    <Grid item xs={6} sm={10} md={2} lg={1} className={classes.followContainer}>
                        <Typography type="caption">
                            Follow Us On
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2} md={1} lg={1} className={classes.followContainerLinks}>
                        <a href="https://www.facebook.com/scoutzoo" target="_blank" className={classes.followLink}>
                            <Icon className={classes.socialLogo}>facebook-filled</Icon>
                        </a>
                        <a href="https://twitter.com/scoutzoo" target="_blank" className={classes.followLink}>
                            <Icon className={classes.socialLogo}>twitter-fill</Icon>
                        </a>
                        <a href="https://www.instagram.com/scoutzoo" target="_blank" className={classes.followLink}>
                            <Icon className={classes.socialLogo}>instagram-fill</Icon>
                        </a>

                    </Grid>
                </Grid>
                <Grid container gutter={8} className={classes.logoSkyrocketContainer}>
                    <Typography type="caption">
                        Copyright © Scout Zoo. Built by
                    </Typography>
                    <a href="https://skyrocket.is" target="_blank" className={classes.followLink}>
                        <Icon className={classes.logoSkyrocket}>skyrocket-avatar</Icon>
                    </a>
                </Grid>
            </footer>

        )
    }
}

Footer.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string,
};

export default compose(withStyles(styleSheet), withWidth())(Footer);
