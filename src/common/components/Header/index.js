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
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import Hidden from 'material-ui/Hidden';

import ScoutIcon from '../Icon';
import {Link} from '../';

import DefaultAvatarImg from './assets/default-avatar.png';


import {PLAYER_ROLE, SCOUT_ROLE} from '../../../user/constants';


const styleSheet = createStyleSheet('Header', theme => ({
    container: {
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
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
        margin: 0,
        overflow: 'hidden'
    },

    logo: {
        fontSize: 26,
        color: '#fff',
        [theme.breakpoints.up('sm')]: {
            transform: 'skew(20deg)',
            margin: 80,
            lineHeight: '70px',
            height: 70,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 10,
            fontSize: 24,
            lineHeight: '60px'
        }

    },
    logoWrap: {
        [theme.breakpoints.up('sm')]: {
            transform: 'skew(20deg)',
        },
    },
    logoLink: {
        height: 70,
        [theme.breakpoints.up('sm')]: {
            backgroundImage: 'linear-gradient(290deg, #f55e58, #c9011b)',
            transform: 'skew(-20deg)',
            marginLeft: -20,
            width: 196,
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
            backgroundColor: '#f5f5f5',
            transform: 'skew(-20deg)',
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
        [theme.breakpoints.up('sm')]: {
            transform: 'skew(20deg)',
        },
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
    }
}));


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: undefined,
            open: false,
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMenuRequestClose = this.handleMenuRequestClose.bind(this);
    }

    handleMenuClick(event) {
        this.setState({open: !this.state.open, anchorEl: event.currentTarget});
    }

    handleMenuRequestClose(page) {
        return () => {
            this.setState({open: false});

            if (page)
                this.props.go(page);
        };
    }

    render() {
        const {user, classes, width} = this.props;
        let DropMenu = null;

        if (user) {
            let items = [
                <MenuItem key="profile" onClick={this.handleMenuRequestClose('/profile')}><span>Profile</span></MenuItem>,
                <MenuItem key="settings" onClick={this.handleMenuRequestClose('/settings')}>Settings</MenuItem>,
                <MenuItem key="logout" onClick={this.props.logOut}>Log Out</MenuItem>,

            ];

            if (user.user_role === SCOUT_ROLE)
                items.unshift(<MenuItem key="favorite"
                                        onClick={this.handleMenuRequestClose('/favorite')}>ShortList</MenuItem>);


            if (width === 'xs') {
                DropMenu = <Drawer
                    id="simple-menu"
                    anchor="top"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    className={classes.containerMenu}
                    onRequestClose={this.handleMenuRequestClose()}>
                    {items}
                </Drawer>;
            } else {
                DropMenu = <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    className={classes.containerMenu}
                    onRequestClose={this.handleMenuRequestClose()}>
                    {items}
                </Menu>;
            }


        }

        return (
            <AppBar position="fixed" className={classes.container}>
                <Toolbar className={classes.root}>
                    <Link to="/" className={classes.logoLink} disabledUnderline>
                        <div className={classes.logoWrap}>
                            <ScoutIcon className={classes.logo}>scoutzoo-symbol</ScoutIcon>
                        </div>
                    </Link>
                    {DropMenu ? (
                        <div className={classes.menu}>
                            <Link to="/" className={classes.menuItem}>
                                <Button className={classes.searchButton}>
                                    <ScoutIcon className={classes.searchIcon}>search</ScoutIcon>
                                    <span>Discover</span>
                                </Button>
                            </Link>

                            <Button className={classNames(classes.menuItem, classes.profileButton)}
                                    aria-owns="simple-menu"
                                    aria-haspopup="true" onClick={this.handleMenuClick}>
                                <Avatar alt={user.full_name} className={classes.avatar} src={DefaultAvatarImg}/>
                                <Hidden xsDown><span className={classes.username}>{user.full_name}</span></Hidden>
                            </Button>
                            {DropMenu}
                        </div>
                    ) : (
                        <div className={classes.menu}>
                            <Link to="/register" className={classes.menuItem}><Button>Sign Up</Button></Link>
                            <Link to="/login" className={classes.menuItem}><Button>Sign In</Button></Link>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Header.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string,
};

export default compose(withStyles(styleSheet), withWidth())(Header);