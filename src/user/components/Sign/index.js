import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Register from '../../containers/Register';
import Login from '../../containers/Login';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import hockeyMen from './image/signup.jpg';
import logo from './image/mstile.png';
import AppBar from 'material-ui/AppBar';
import Menu, {MenuItem} from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';

const styleSheet = createStyleSheet('Sign', theme => ({
    root: {
        backgroundColor: '#ffffff',
    },
    grid: {
        display: 'inline-block',

    },
    header: {
        marginTop: 111,
        marginLeft: '30%',

        [theme.breakpoints.down('md')]: {
            marginLeft: 192,
        },
    },
    text: {
        color: '#d7001e'
    },
    crop: {
        float: 'left',
        overflow: 'hidden', /* this is important */
        border: 1
    },
    crop_img: {
        marginTop: -1,
        marginLeft: -333,
        marginRight: 0,
        marginBottom: -4,
        width: 1600,
        height: 992,
    },


    avatar: {
        position: 'absolute',
        left: 30,
        top: -29,
        width: 150,
        height: 150,
    },
    container: {
        //display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#ffffff',
        boxShadow: '0 0 0px 0 rgba(0, 0, 0, 0.2)',
    },
    leftBg: {
        position: 'absolute',
        left: -20,
        top: 0,
        height: 70,

        backgroundImage: 'linear-gradient(290deg, rgb(216, 23, 15), #da261e)',
        transform: 'skew(-20deg)',
        width: '196px',
        minWidth: 196,

    },

}));

function TabContainer(props) {
    return (
        <div style={{padding: 20}}>
            {props.children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Sign extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    handleChangeTab = (event, index) => {

        if (index === 0) {
            this.props.goLogin();
        } else {
            this.props.goRegister();
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <AppBar position="absolute" className={classes.container}>
                    <div className={classes.leftBg}>
                        <Avatar src={logo} className={classes.avatar}>

                        </Avatar>
                    </div>

                </AppBar>


                <Grid container direction={'row'} className={classes.root}>
                    <Grid item lg={6} md={7} className={classes.grid}>
                        <Tabs className={classes.header}
                              index={this.props.type === 'in' ? 0 : 1}
                              onChange={this.handleChangeTab}
                        >
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
                        {this.props.type === 'in' ? (
                            <TabContainer>
                                <Login/>
                            </TabContainer>
                        ) : (
                            <TabContainer>
                                <Register/>
                            </TabContainer>
                        )}

                    </Grid>
                    <Grid item lg={6} md={4}>
                        <Hidden smDown>
                            <div className={classes.crop}>
                                <img className={classes.crop_img}
                                     src={hockeyMen}
                                     alt='HockeyMen'
                                />
                            </div>
                        </Hidden>
                    </Grid>
                </Grid>
            </div>);
    }
}

Sign.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Sign);