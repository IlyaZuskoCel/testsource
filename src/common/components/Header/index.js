/**
 * Created by aleksandr on 7/20/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom'

import {withStyles, createStyleSheet} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';

import LogoImg from './assets/logo.jpg';
import DefaultAvatarImg from './assets/default-avatar.png';


import {PLAYER_ROLE, SCOUT_ROLE} from '../../../user/constants';


const styleSheet = createStyleSheet('Header', {
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
    username: {
        paddingLeft: 10,
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
});


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
        this.setState({open: true, anchorEl: event.currentTarget});
    }

    handleMenuRequestClose() {
        this.setState({open: false});
    }

    render() {
        const {user, classes} = this.props;


        const DropMenu = !user ? null : user.user_role === SCOUT_ROLE ? (
            <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.open}
                onRequestClose={this.handleMenuRequestClose}
            >
                <MenuItem onClick={this.handleMenuRequestClose}>ShortList</MenuItem>
                <MenuItem onClick={this.handleMenuRequestClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuRequestClose}>Settings</MenuItem>
                <MenuItem onClick={this.props.logOut}>Log Out</MenuItem>
            </Menu>
        ) : (
            <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.open}
                onRequestClose={this.handleMenuRequestClose}
            >
                <MenuItem onClick={this.handleMenuRequestClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuRequestClose}>Settings</MenuItem>
                <MenuItem onClick={this.props.logOut}>Log Out</MenuItem>
            </Menu>
        );

        return (
            <AppBar position="static" color="default">
                <Toolbar className={classes.root}>
                    <Link to="/"><img className={classes.logo} src={LogoImg}/></Link>

                    {DropMenu ? (
                        <div className={classes.menu}>
                            <Button>Search</Button>

                            <Button aria-owns="simple-menu" aria-haspopup="true" onClick={this.handleMenuClick}>
                                <Avatar alt="Remy Sharp" src={DefaultAvatarImg}/>
                                <span className={classes.username}>{user.full_name}</span>
                                <Icon>arrow_drop_down</Icon>
                            </Button>
                            {DropMenu}
                        </div>
                    ) : (
                        <div className={classes.menu}>
                            <Link to="/register"><Button>Sign Up</Button></Link>
                            <Link to="/login"><Button>Sign In</Button></Link>
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
};

export default withStyles(styleSheet)(Header);