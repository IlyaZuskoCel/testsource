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
import classNames from 'classnames';
import ScoutIcon from '../../../common/components/Icon';
import {Link} from '../../../common/components';

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


    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#ffffff',
        [theme.breakpoints.up('sm')]: {
            boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.2)',
        },

        [theme.breakpoints.down('sm')]: {
            height: 60,
            backgroundImage: 'linear-gradient(279deg, #f55e58, #c9011b)'
        }
    },


    logo: {
        fontSize: 26,
        color: '#fff',
        [theme.breakpoints.up('sm')]: {
            lineHeight: '70px',
            height: 70,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 10,
            fontSize: 24,
            lineHeight: '60px'
        }

    },

    logoLink: {

        height: 70,
        [theme.breakpoints.up('sm')]: {
            margin: 60
        },
        [theme.breakpoints.down('sm')]: {
            height: 60,
        }
    },
    username: {
        paddingLeft: 16,
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {

            marginRight: -20,
            paddingRight: 20,
            height: 70,
            minWidth: 480,

        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'flex-end'
        }
    },
    menuItem: {
        marginLeft: 24,
        marginRight: 24,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 0,
        }

    },
    profileButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        '&:hover': {
            backgroundColor: 'transparent',
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 0
        }

    },
    search: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
        textTransform: 'uppercase'
    },
    searchIcon: {
        marginRight: 8,
        fontSize: 20
    },
    containerMenu: {


        [theme.breakpoints.up('sm')]: {
            overflowX: 'visible',
            overflowY: 'visible',
            marginTop: 50,
            '&:after': {
                content: '""',
                height: 0,
                width: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom: '10px solid #fff',
                position: 'absolute',
                top: -10,
                left: 24
            }
        },

        [theme.breakpoints.down('sm')]: {
            zIndex: 1000,
            '& > div': {
                top: 60
            }
        }


    },
    avatar: {
        backgroundColor: '#f3f4f6',
        boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.2)',
        border: 'solid 2px #ffffff',
        width: 32,
        height: 32,
    },
    searchButton: {
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#000'
        },
        [theme.breakpoints.down('sm')]: {
            color: '#ffffff',
            opacity: 0.6,
        }
    },
    searchButtonHideBackground: {
        color: '#000',
        opacity: 1,
    },

    hideBackground: {
        backgroundColor: 'transparent',
        transform: 'none',
        backgroundImage: 'none'
    },
    hideShadow: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        transform: 'none',
        backgroundImage: 'none'
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    leftBg: {
        zIndex: -1,
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
        zIndex: -1,
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
    };

    render() {
        const {classes} = this.props;
        const hideBackground = (this.props.hideBackgroundTopHeader && !this.state.scroll)
            || (this.props.hideBackgroundTopMobileHeader && width === 'xs');
        return (
            <div>
                <AppBar position="fixed" className={classNames(classes.container, {[classes.hideShadow]: hideBackground})}>
                    <div className={classNames({[classes.leftBg]: !hideBackground})}/>
                    <div className={classNames({[classes.rightBg]: !hideBackground})}/>
                    <Grid container gutter={8} className={classes.root}>
                        <Grid item xs={4}>
                            <Link to="/"
                                  className={classNames(classes.logoLink)}
                                  disabledUnderline>
                                <ScoutIcon className={classes.logo}>scoutzoo-symbol</ScoutIcon>
                            </Link>
                        </Grid>
                        <Grid item xs={8} className={classes.right}>
                            {/*{DropMenu ? (*/}
                                {/*<div className={classNames(classes.menu)}>*/}
                                    {/*<Link to="/" disabledUnderline*/}
                                          {/*className={classNames(classes.menuItem)}>*/}
                                        {/*<Button*/}
                                            {/*className={classNames(classes.searchButton, {[classes.searchButtonHideBackground]: hideBackground && !this.props.hideBackgroundTopMobileHeader})}>*/}
                                            {/*<ScoutIcon className={classes.searchIcon}>search</ScoutIcon>*/}
                                            {/*<span>Discover</span>*/}
                                        {/*</Button>*/}
                                    {/*</Link>*/}

                                    {/*<Button*/}
                                        {/*className={classNames(classes.menuItem, classes.profileButton)}*/}
                                        {/*aria-owns="simple-menu"*/}
                                        {/*aria-haspopup="true" onClick={this.handleMenuClick}>*/}
                                        {/*<Avatar alt={user.full_name} className={classes.avatar}*/}
                                                {/*src={user.profile_picture || DefaultAvatarImg}/>*/}
                                        {/*<Hidden xsDown><span*/}
                                            {/*className={classes.username}>{user.first_name} {user.last_name}</span></Hidden>*/}
                                    {/*</Button>*/}
                                    {/*{DropMenu}*/}
                                {/*</div>*/}
                            {/*) : (*/}
                                {/*<div className={classNames(classes.menu)}/>*/}
                            {/*)}*/}
                        </Grid>
                    </Grid>

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