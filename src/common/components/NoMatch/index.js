/**
 * Created by aleksandr on 7/20/17.
 * moonion.com
 */

import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Img from './assets/image/404.jpg';


import {Link} from '../';


const styleSheet = createStyleSheet('NoMatch', theme => ({
    root: {
        position: 'relative',
        paddingLeft: 136,
        paddingRight: 136,
        paddingTop: 260,
        [theme.breakpoints.down('md')]: {
            paddingLeft: 16,
            paddingRight: 16,
        }


    },
    headline: {
        textTransform: 'uppercase',
    },
    subheading: {
        color: '#eb3941'
    },
    button: {
        marginTop: 74,
        [theme.breakpoints.down('md')]: {
            marginTop: 40,
        },

    },
    bg: {
        opacity: 0.1,
        minWidth: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    }
}));


const NoMatch = ({location, classes}) => (
    <Grid container gutter={8} className={classes.root}>
        <img src={Img} className={classes.bg}/>

        <Grid item xs={12}>
            <Typography type="headline" className={classes.headline}>404 page not found</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography type="subheading" className={classes.subheading}>Sorry, this page does not exist.</Typography>
        </Grid>
        <Grid item xs={12}>
            <Link to="/profile">
                <Button raised color="primary" className={classes.button}>Back to my profile</Button>
            </Link>
        </Grid>

    </Grid>
);

NoMatch.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(NoMatch);