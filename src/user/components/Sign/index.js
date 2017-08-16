import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Register from '../../containers/Register';
import Login from '../../containers/Login';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';

const styleSheet = createStyleSheet('Main', theme => ({
    root: {
        backgroundColor: '#ffffff',
        marginTop: 100,
        left: '11%',
        width: '74%',
        marginLeft:50,
        [theme.breakpoints.up('sm')]: {

        },
    },
    header: {
        //alignItems: 'center',
        // backgroundColor: '#ffffff'
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
    blocks: {
        display: 'inline-block',
        float: 'left'
    },
    image: {
        width: 704,
        height: 738,
    },
    text: {
        color: '#d7001e'
    }
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
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container direction={'row'} className={classes.root}>
                <Grid item lg={6} md={7} sm={8} xs={12}>
                    <Tabs className={classes.header}
                          index={this.props.type === 'in' ? 0 : 1}
                          onChange={this.handleChangeTab}

                    >
                        <Tab label={
                            <Typography className={classes.text} type="body2">
                                Log In
                            </Typography>
                        }>

                        </Tab>
                        <Tab label={
                            <Typography className={classes.text} type="body2">
                                Sign up
                            </Typography>
                        }>

                        </Tab>
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
                <Grid item lg={6} md={5} sm={4} xs={0}>
                    <Hidden xsDown>
                        <div>
                            <img src='../../../assets/image/signup.jpg'
                                 alt='HockeyMenHockeyMenHockeyMenHockeyMenHockeyMenHockeyMen'
                                 className={classes.image}/>
                        </div>
                    </Hidden>
                </Grid>
            </Grid>);
    }
}

Sign.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Sign);