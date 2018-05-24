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

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Hidden from '../Hidden';


import ScoutIcon from '../Icon';
import {Link} from '../';

import DefaultAvatarImg from './assets/default-avatar.png';


import {PLAYER_ROLE, SCOUT_ROLE} from '../../../user/constants';


const styleSheet = createStyleSheet('Header', theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#ffffff',
        [theme.breakpoints.up('md')]: {
            boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.2)',
        },

        [theme.breakpoints.down('md')]: {
            height: 60,
            backgroundImage: 'linear-gradient(279deg, #f55e58, #c9011b)'
        }
    },
    root: {
        maxWidth: 1440,
    },

    logo: {
        fontSize: 26,
        color: '#fff',
        [theme.breakpoints.up('md')]: {
            lineHeight: '70px',
            height: 70,
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: 10,
            fontSize: 24,
            lineHeight: '60px'
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
    username: {
        paddingLeft: 16,
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {

            marginRight: -20,
            paddingRight: 20,
            height: 70,
            minWidth: 480,

        },
        [theme.breakpoints.down('md')]: {
            justifyContent: 'flex-end'
        }
    },
    menuItem: {
        marginLeft: 24,
        marginRight: 24,

        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('md')]: {
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


        [theme.breakpoints.up('md')]: {
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

        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('md')]: {
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

        [theme.breakpoints.up('md')]: {
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
        [theme.breakpoints.up('md')]: {
            backgroundColor: '#f5f5f5',
            transform: 'skew(-20deg)',
            width: 'calc( ( 100% - 1440px ) / 2 + 480px )',
            minWidth: 480,
            right: -20
        },

    },
    MenuItem: {
        height: 40,
        backgroundColor: 'transparent',
        borderRadius: 0,
        fontFamily: 'UnitedSansReg-Heavy',
        fontSize: 20,
        lineHeight: '20px',
        fontWeight: 900,
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
        padding: '8px 4px',
        minWidth: 160,
        borderBottom: 'solid 1px #e2e2e2',
        [theme.breakpoints.down('md')]: {
            minWidth: 120,
            fontSize: 16,
            letterSpacing: '0.3px',
            padding: '32px 12px',
            borderBottom: 'solid 2px #e2e2e2',
            textAlign: 'center',
            justifyContent: 'center',

        },


        '&:last-child': {
            borderBottom: 0,
        }
    },

    hideShadowScroll: {
        [theme.breakpoints.down('md')]: {
            boxShadow: 'none',
        }
    },

    hideShadowBackground: {
        [theme.breakpoints.down('md')]: {
            backgroundColor: 'transparent',
            transform: 'none',
            backgroundImage: 'none'
        }
    },
    raised: {
        minWidth: 160,
        '&:hover': {
            boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.3)',
            backgroundColor:'#fff'
        },
        [theme.breakpoints.down('md')]: {
            color:'#fff',
            minWidth:60
        },
        [theme.breakpoints.down('sm')]: {
            color:'#fff',
            minWidth:60,
            '&:hover, &:focus, &:active': {
                boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.3)',
                backgroundColor:'#fff',
                color: '#d7001e',
            },
        },
    },
}));


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scroll: false,
            anchorEl: undefined,
            open: false,
            openMobile: false
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMobileMenuClick = this.handleMobileMenuClick.bind(this);
        this.handleMenuRequestClose = this.handleMenuRequestClose.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll(e) {
        const scroll = window.scrollY > 0;
        if (scroll !== this.state.scroll) {
            this.setState({scroll})
        }


    };

    handleMenuClick(event) {
        this.setState({open: !this.state.open, anchorEl: event.currentTarget});
    }

    handleMobileMenuClick(event){
        this.setState({openMobile: !this.state.openMobile});
    }

    handleMenuRequestClose(page) {
        return () => {
            this.setState({open: false});
            if (page)
                this.props.go(page);
        };
    }

    render() {
        const {user, classes} = this.props;
        let DropMenu = null;
        let desktopDropMenu, mobileDropMenu;
        const width = 'md';
        const smallWidth = width === 'sm'|| width === 'xs';
        if (user) {
            let items = [
                <MenuItem key="profile"
                          className={classes.MenuItem}
                          onClick={this.handleMenuRequestClose(`/profile/${user.id}`)}>Profile</MenuItem>,
                <MenuItem key="settings"
                          className={classes.MenuItem}
                          onClick={this.handleMenuRequestClose('/settings')}>Settings</MenuItem>,
                <MenuItem key="logout"
                          className={classes.MenuItem}
                          onClick={this.props.logOut}>Log Out</MenuItem>,

            ];

            if (user.role === SCOUT_ROLE)
                items.unshift(<MenuItem key="favorite"
                                        className={classes.MenuItem}
                                        onClick={this.handleMenuRequestClose('/profile/shortlist')}>ShortList</MenuItem>);

            mobileDropMenu =
                <Hidden only={['md','lg','xl']} >
                <div>
                <Button
                    className={classNames(classes.menuItem, classes.profileButton)}
                    aria-owns="simple-menu"
                    aria-haspopup="true" onClick={this.handleMobileMenuClick}>
                    <Avatar alt={user.full_name} className={classes.avatar}
                            src={user.profile_picture || DefaultAvatarImg}/>
                    <Hidden smDown><span
                        className={classes.username}>{user.first_name} {user.last_name}</span></Hidden>
                </Button>
                    <Hidden only={['md','lg','xl']} >
                    <Drawer
                        id="simple-menu"
                        anchor="top"
                        open={this.state.openMobile}
                        className={classes.containerMenu}
                        onRequestClose={this.handleMenuRequestClose()}>
                        {items}
                    </Drawer>
                    </Hidden>
                </div>
                </Hidden>

            desktopDropMenu =
                <Hidden only={['xs', 'sm']}>
                <div>
                <Button
                    className={classNames(classes.menuItem, classes.profileButton)}
                    aria-owns="simple-menu"
                    aria-haspopup="true" onClick={this.handleMenuClick}>
                    <Avatar alt={user.full_name} className={classes.avatar}
                            src={user.profile_picture || DefaultAvatarImg}/>
                    <Hidden smDown><span
                        className={classes.username}>{user.first_name} {user.last_name}</span></Hidden>
                </Button>
                    <Hidden only={['xs', 'sm']}>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={this.state.open}
                        className={classes.containerMenu}
                        onRequestClose={this.handleMenuRequestClose()}>
                        {items}
                    </Menu>
                    </Hidden>
                </div>
                </Hidden>
        }
        const hideBackground = (this.props.hideBackground
            || this.props.hideBackgroundTopHeader && !this.state.scroll)
            || (this.props.hideBackgroundTopMobileHeaderScroll && smallWidth && !this.state.scroll)
            || (this.props.hideBackgroundTopMobileHeader && smallWidth);

        return (
            <AppBar position="fixed"
                    className={classNames(classes.container,
                        {[classes.hideShadow]: hideBackground}
                    )}>
                <div className={classNames({[classes.leftBg]: !hideBackground})}/>
                <div className={classNames({[classes.rightBg]: !hideBackground})}/>
                <Grid container gutter={8} className={classes.root}>
                    <Grid item xs={4}>

                        {user ? (
                            <Link to={user.role === SCOUT_ROLE ? '/search/player' : `/profile/${user.id}`}
                                  className={classNames(classes.logoLink)}
                                  disabledUnderline>
                                <ScoutIcon className={classes.logo}>scoutzoo-symbol</ScoutIcon>
                            </Link>
                        ) : (
                            <a href="https://scoutzoo.com" target="_blank" className={classes.logoLink}>
                                <ScoutIcon className={classes.logo}>scoutzoo-symbol</ScoutIcon>
                            </a>
                        )}

                    </Grid>
                    <Grid item xs={8} className={classes.right}>
                        {user ? (
                            <div className={classNames(classes.menu)}>
                                <Link to="/search" disabledUnderline
                                      className={classNames(classes.menuItem)}>
                                    <Button
                                        className={classNames(classes.searchButton, {[classes.searchButtonHideBackground]: hideBackground && !this.props.hideBackgroundTopMobileHeader && !this.props.hideBackgroundTopMobileHeaderScroll})}>
                                        <ScoutIcon className={classes.searchIcon}>search</ScoutIcon>
                                        <span>Discover</span>
                                    </Button>
                                </Link>
                                {mobileDropMenu}
                                {desktopDropMenu}
                            </div>
                        ) : (
                            <div className={classNames(classes.menu)}>
                                <Link to="/sign/in" disabledUnderline
                                      className={classNames(classes.menuItem)}>
                                    <Button className={classNames(classes.raised)}>
                                        log in
                                    </Button>
                                </Link>
                                <Link to="/sign/up" disabledUnderline
                                      className={classNames(classes.menuItem)}>
                                    <Button className={classNames(classes.raised)}>
                                        sign up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </Grid>
                </Grid>

            </AppBar>
        )
    }
}

Header.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Header);