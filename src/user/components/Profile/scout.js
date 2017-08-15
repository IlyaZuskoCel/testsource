/**
 * Created by aleksandr on 8/11/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import Hidden from 'material-ui/Hidden';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';

import {Link, Icon} from '../../../common/components';
import {PLAYER_ROLE, SCOUT_ROLE, GENDER_FEMALE, GENDER_MALE, SHOT_LEFT, SHOT_RIGHT, POS_LIST} from '../../constants';

import FavoriteButton from '../../containers/FavoriteButton';
import ShareButton from '../ShareButton';

import scoutBg from './assets/images/profile-scout-background.jpg';
import defaultPhoto from './assets/images/default-photo.png';


const styleSheet = createStyleSheet('ScoutProfile', theme => ({
    root: {},
    content: {
        maxWidth: 1168,
        marginTop: 56,
        width: '100%',
        margin: 'auto'
    },
    backgroundImg: {
        zIndex: -1,
        minWidth: '100%',
        height: 688,
        [theme.breakpoints.down('sm')]: {
            height: 536,
        },
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.5,
        backgroundImage: 'linear-gradient(196deg, #f3f3f3, rgba(255, 255, 255, 0.74) 53%, rgba(250, 250, 250, 0.86) 74%, #f3f3f3)',

    },
    backgroundLeft: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        width: 'calc( ( 100% - 1440px ) / 2 + 786px )',
        minWidth: 196,
        right: 'calc( ( 100% - 1440px ) / 2 + 872px)',

        height: 688,

        [theme.breakpoints.down('lg')]: {
            right: 792,
        },
        [theme.breakpoints.down('md')]: {
            right: 600,
        },


        [theme.breakpoints.down('sm')]: {
            height: 536,
            right: 404,
            opacity: 0.8

        },

        [theme.breakpoints.down('xs')]: {
            height: 536,
            right: 304,
            opacity: 0.8

        },

        backgroundImage: 'linear-gradient(311deg, #f55e58, #c9011b)',
        transform: 'skew(-20deg)',
    },

    backgroundRight: {
        zIndex: -1,
        backgroundColor: '#f5f5f5',
        backgroundImage: 'linear-gradient(196deg, #f3f3f3, rgba(255, 255, 255, 0.74) 53%, rgba(250, 250, 250, 0.86) 74%, #f3f3f3)',

        position: 'absolute',
        top: 0,
        right: 'calc( ( 100% - 1440px ) / 2 + 120px)',
        width: 752,
        height: 688,
        opacity: 0.8,

        [theme.breakpoints.down('lg')]: {
            right: 40,
        },

        [theme.breakpoints.down('md')]: {
            width: 560,
        },

        [theme.breakpoints.down('sm')]: {
            height: 536,
            width: 364,
        },

        [theme.breakpoints.down('xs')]: {
            height: 536,
            width: 264,
        },
        transform: 'skew(-20deg)',
    },
    backgroundCenter: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 688,
        [theme.breakpoints.down('sm')]: {
            height: 536,
        },

        backgroundImage: 'linear-gradient(196deg, #f3f3f3, rgba(255, 255, 255, 0.74) 53%, rgba(250, 250, 250, 0.86) 74%, #f3f3f3)',
    },


    topNavigate: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    rightNavigate: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backLink: {
        textTransform: 'uppercase',
        marginLeft: 48,
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            marginLeft: 16,
        },

    },
    backTitle: {
        marginLeft: 16
    },


    editIcon: {
        marginRight: 16,
        fontSize: 18
    },
    editButton: {
        width: 120,
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#000',
            opacity: 1,
        },
        opacity: 0.6,
    },
    addVideoButton: {
        marginLeft: 40,
    },
    videoList: {
        width: '100%',
        marginTop: 72,
        marginBottom: 72

    },
    videoListWrap: {
        padding: '56px 80px'
    },
    desc: {
        padding: '16px 0'
    },
    point: {
        marginLeft: -12
    },
    addVideoButtonDesc: {
        margin: '8px 16px'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 12
    },
    infoCard: {
        width: 270,
        height: 402,
        marginLeft: 144,
        marginRight: 20,
        backgroundColor: '#f7f7f7',
        position: 'relative'

    },
    infoCardData: {
        backgroundImage: 'linear-gradient(196deg, #d1d1d1, rgba(255, 255, 255, 0.74) 53%, #d9d9d9)',
        height: 129,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    infoCardPhotoWrap: {
        width: 270,
        height: 270,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    infoCardPhotoDefaultWrap: {
        justifyContent: 'center',
    },
    infoCardPhoto: {
        maxWidth: 270,
        maxHeight: 270
    },
    infoCardPhotoDefault: {
        width: 176
    },
    infoCardLeagueLine: {
        height: 3,
        backgroundImage: 'linear-gradient(271deg, #c39e3d, #ddc674)',
        position: 'relative'

    },
    infoCardLeague: {
        position: 'absolute',
        top: -24,
        left: '50%',
        marginLeft: -22,
        width: 44,
        height: 48,
        backgroundImage: 'linear-gradient(318deg, #c39e3d, #ddc674)',
        color: '#fff',
        verticalAlign: 'middle',
        lineHeight: '48px'

    },
    infoCardTeam: {},

    infoRight: {
        width: 566,
        marginLeft: 20,
        marginRight: 20,
    },

    infoRightAbout: {
        fontSize: 16,
        lineHeight: 1.5,
        marginTop: 38

    },
    profileIncomplete: {
        marginTop: 38
    }

}));


class ScoutProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openUserMenu: false,
            anchorUserMenuEl: undefined,
        };

    }

    toggleUserMenu = (event) => {
        let state = {openUserMenu: !this.state.openUserMenu};
        if (!this.state.openUserMenu)
            state.anchorUserMenuEl = event.currentTarget;
        this.setState(state)
    };

    report = () => {
        this.props.report(this.props.user.id);
    };

    render() {

        const {classes, user, currentUser} = this.props;

        return <Grid container gutter={8} className={classes.root}>
            <img className={classes.backgroundImg} src={scoutBg}/>

            <div className={classes.backgroundRight}/>
            <div className={classes.backgroundLeft}/>

            <div className={classes.content}>

                {user.id !== currentUser.id ? (
                    <div className={classes.topNavigate}>
                        <Link to="/" onClick={this.props.goBack} invert disabledUnderline className={classes.backLink}>
                            <Icon>previous</Icon>
                            <Hidden xsDown><span className={classes.backTitle}>Back to search</span></Hidden></Link>
                        <div>
                            <IconButton
                                aria-label="More"
                                aria-owns={this.state.openUserMenu ? 'user-menu' : null}
                                aria-haspopup="true"
                                onClick={this.toggleUserMenu}>
                                <Icon>dots-three-vertical</Icon>
                            </IconButton>
                            <Menu
                                id="user-menu"
                                anchorEl={this.state.anchorUserMenuEl}
                                open={this.state.openUserMenu}
                                onRequestClose={this.toggleUserMenu}>
                                <MenuItem onClick={this.report}>Report</MenuItem>
                            </Menu>
                        </div>
                    </div>
                ) : (
                    <div className={classes.topNavigate}>
                        <ShareButton/>
                        <div className={classes.rightNavigate}>
                            <Link to="/user/edit" disabledUnderline>
                                <Button className={classes.editButton}>
                                    <Icon className={classes.editIcon}>pencil</Icon>
                                    <span>Edit</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                <div className={classes.infoContainer}>
                    <Paper className={classes.infoCard} square>

                        <div
                            className={classNames(classes.infoCardPhotoWrap, {[classes.infoCardPhotoDefaultWrap]: !user.profile_picture})}>
                            <img
                                className={classNames(classes.infoCardPhoto, {[classes.infoCardPhotoDefault]: !user.profile_picture})}
                                src={user.profile_picture || defaultPhoto}/>

                        </div>
                        <div className={classes.infoCardLeagueLine}/>
                        <div className={classes.infoCardData}>
                            <Typography type="subheading" align="center" className={classes.infoCardTeam}>
                                {user.team_current_name || 'Team Unknown'}
                            </Typography>
                            <Typography type="body1" align="center">
                                {user.city || user.state || user.country ? `${user.city || ''}${user.state ? (user.city ? ', ' + user.state : user.state ) : ''} ${user.country ? (user.city || user.state ? ', ' + user.country : user.country ) : ''}` : 'Location Unknown'}
                            </Typography>

                        </div>
                    </Paper>
                    <div className={classes.infoRight}>
                        <Typography type="headline" className={classes.infoRightName}>{user.full_name}</Typography>

                        <Typography type="body2">{user.job_title || 'Title Unknown'}</Typography>

                        {user.bio && (
                            <Typography type="body1" className={classes.infoRightAbout}>{user.bio}</Typography>
                        )}

                        {user.id === currentUser.id && (!user.bio || !user.profile_picture) && (
                            <div className={classes.profileIncomplete}>
                                <Typography type="subheading">Your profile is incomplete!</Typography>

                                <Typography type="body1" className={classes.point}>
                                    <Link to="/user/edit" disabledUnderline>
                                        <Button className={classes.editButton}>
                                            <Icon className={classes.editIcon}>pencil</Icon>
                                            <span>Edit</span>
                                        </Button>
                                    </Link> your profile information
                                </Typography>
                            </div>
                        )}

                    </div>
                </div>


            </div>

        </Grid>

    }
}

ScoutProfile.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};


export default compose(withStyles(styleSheet), withWidth())(ScoutProfile);