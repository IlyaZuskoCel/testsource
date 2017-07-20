/**
 * Created by aleksandr on 7/20/17.
 * moonion.com
 */

import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom'

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';


import LogoImg from './assets/logo.jpg';

const styleSheet = createStyleSheet('Footer', {
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo: {
        margin: 10,
        width: 50,
        height: 50,
    },
    menu: {},
});


const Footer = ({user, classes}) => (
    <Paper>
        <Toolbar className={classes.root}>
            <Link to="/"><img className={classes.logo} src={LogoImg}/></Link>

            <div className={classes.menu}>
                <Link to="/about"><Button>About Us</Button></Link>
                <Link to="/contact"><Button>Contact Us</Button></Link>
                <Link to="/privacy"><Button>Privacy Policy</Button></Link>
                <Link to="/terms"><Button>Terms & Conditions</Button></Link>
            </div>
        </Toolbar>
    </Paper>
);

Footer.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Footer);