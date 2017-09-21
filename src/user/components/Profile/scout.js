/**
 * Created by aleksandr on 8/11/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import Hidden from 'material-ui/Hidden';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';

import {Link, Icon} from '../../../common/components';

import ReportButton from '../../containers/ReportButton';

import {absUrl} from '../../../common/helpers';

import ShareButton from '../ShareButton';

import scoutBg from './assets/images/profile-scout-background.jpg';
import defaultPhoto from './assets/images/default-photo.png';


const styleSheet = createStyleSheet('ScoutProfile', theme => ({
    root: {},
    content: {
        maxWidth: 1168,
        marginTop: 56,
        width: '100%',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
        },
    },
    backgroundImgWrap: {
        zIndex: -1,
        width: '100%',
        height: 688,
        [theme.breakpoints.down('sm')]: {
            height: 536,
        },
        [theme.breakpoints.up('lg')]: {
            width: '70%',
        },
        position: 'absolute',
        top: 0,
        right: 0,
        opacity: 0.5,
        backgroundImage: 'linear-gradient(196deg, #f3f3f3, rgba(255, 255, 255, 0.74) 53%, rgba(250, 250, 250, 0.86) 74%, #f3f3f3)',
        overflow: 'hidden'
    },
    backgroundImg: {
        minWidth: '100%',
        height: 1155,
        position: 'absolute',
        top: '50%',
        right: 0,
        marginTop: -578,
        [theme.breakpoints.down('sm')]: {
            height: 770,
            marginTop: -385,
        },


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
            right: 284,
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
            right: 0,
            height: 536,
            width: 284,
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
        marginTop: 12,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 32,
        },
    },
    infoCard: {
        width: 270,
        minHeight: 402,
        marginLeft: 144,
        marginRight: 20,
        backgroundColor: '#f7f7f7',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 20,
            height: 324,
            width: 218,
        },

    },
    infoCardData: {
        backgroundImage: 'linear-gradient(196deg, #d1d1d1, rgba(255, 255, 255, 0.74) 53%, #d9d9d9)',
        minHeight: 129,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        [theme.breakpoints.down('sm')]: {
            height: 132,
            backgroundImage: 'none',
            backgroundColor: '#ffffff'


        },
    },

    infoCardPhotoWrap: {
        width: 270,
        height: 270,
        overflow: 'hidden',
        position: 'relative',
        margin: 'auto',

        [theme.breakpoints.down('sm')]: {
            height: 192,
            width: 218,
        },

    },
    infoCardPhotoDefaultWrap: {
        justifyContent: 'center',
    },
    infoCardPhoto: {
        minWidth: '100%',
        minHeight: '100%',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        position: 'absolute',
        margin: 'auto',

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
    infoCardDataSeparator: {
        margin: '4px auto',
        width: 26,
        border: 'solid 1px #c2a24d'
    },
    infoRight: {
        width: 566,
        marginLeft: 20,
        marginRight: 20,
    },

    infoRightAbout: {
        fontSize: 16,
        lineHeight: 1.5,
        marginTop: 38,
        wordWrap: "break-word",
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
            fontSize: 14,
            lineHeight: 1.71,
        }

    },
    profileIncomplete: {
        marginTop: 38
    },
    mobileContent: {},
    tabContent: {
        padding: 16,
        paddingTop: 24,
    },
    descTitle: {
        [theme.breakpoints.down('sm')]: {
            paddingTop: 32,
            paddingBottom: 8,
        },
    },
    descBottom: {
        paddingBottom: 64
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


    render() {

        const {classes, user, currentUser, isCurrent} = this.props;

        return <div className={classes.root}>
            <div className={classes.backgroundImgWrap}>
                <img className={classes.backgroundImg} src={scoutBg}/>
            </div>
            <div className={classes.backgroundRight}/>
            <div className={classes.backgroundLeft}/>

            <div className={classes.content}>

                {!isCurrent ? (
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
                                <ReportButton onClose={this.toggleUserMenu} user={user.id}
                                              username={`${user.first_name} ${user.last_name}`}>Report</ReportButton>
                            </Menu>
                        </div>
                    </div>
                ) : (
                    <div className={classes.topNavigate}>
                        <ShareButton url={absUrl(`/profile/${user.id}`)}
                                     title={`My profile on Scout Zoo`}/>
                        <div className={classes.rightNavigate}>
                            <Link to="/profile/edit" disabledUnderline>
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
                            <Hidden smUp>
                                <div>
                                    <Typography type="title" align="center"
                                                className={classes.infoCardName}>{user.first_name} {user.last_name}</Typography>
                                    {user.job_title && (
                                        <Typography type="body1" align="center">{user.job_title}</Typography>)}
                                    <div className={classes.infoCardDataSeparator}/>
                                </div>
                            </Hidden>
                            <Typography type="subheading" align="center" className={classes.infoCardTeam}>
                                {!!!user.team_status && user.team && 'Pending / '}{user.team || 'Team Unknown'}
                                {!!!user.league_status && user.league && ' - Pending / '}{user.league_short ? ' - ' + user.league_short : (!!!user.league_status ? user.league : '')}

                            </Typography>
                            <Typography type="body1" align="center">
                                {(user.team_location !== 'n/a' && user.team_location) || user.team_country || 'Location Unknown'}
                            </Typography>

                        </div>
                    </Paper>
                    <Hidden xsDown>
                        <div className={classes.infoRight}>
                            <Typography type="headline"
                                        className={classes.infoRightName}>{user.first_name} {user.last_name}</Typography>

                            <Typography type="body2">{user.job_title || 'Title Unknown'}</Typography>

                            {user.biography && (
                                <Typography type="body1"
                                            className={classes.infoRightAbout}>{user.biography}</Typography>
                            )}

                            {isCurrent && (!user.biography || !user.profile_picture) && (
                                <div className={classes.profileIncomplete}>
                                    <Typography type="subheading">Your profile is incomplete!</Typography>

                                    <Typography type="body1" className={classes.point}>
                                        <Link to="/profile/edit" disabledUnderline>
                                            <Button className={classes.editButton}>
                                                <Icon className={classes.editIcon}>pencil</Icon>
                                                <span>Edit</span>
                                            </Button>
                                        </Link> your profile information
                                    </Typography>
                                </div>
                            )}

                        </div>
                    </Hidden>
                </div>


                {(isCurrent || user.biography) && (
                    <Hidden smUp>
                        <Paper square className={classes.mobileContent}>
                            <div className={classes.tabContent}>

                                {isCurrent && (!user.biography || !user.profile_picture || !currentUser.is_verify) && (
                                    <Typography type="subheading" align="center" className={classes.descTitle}>
                                        Your profile is incomplete!
                                    </Typography>
                                )}

                                {isCurrent && (!user.biography || !user.profile_picture) && (

                                    <Typography type="body1" className={classes.point}>
                                        <Link to="/profile/edit" disabledUnderline>
                                            <Button className={classes.editButton}>
                                                <Icon className={classes.editIcon}>pencil</Icon>
                                                <span>Edit</span>
                                            </Button>
                                        </Link> your profile information
                                    </Typography>
                                )}


                                {isCurrent && !currentUser.is_verify && (
                                    <div>
                                        <Typography type="body1" align="center" className={classes.desc}>
                                            You must be a verified scout before contacting players.
                                        </Typography>
                                        <Typography type="caption" align="center"
                                                    className={classNames(classes.desc, classes.descBottom)}>
                                            Please go to your <Link to="/setting">Settings</Link> to request to get
                                            verified.
                                        </Typography>
                                    </div>
                                )}


                                {user.biography && (
                                    <Typography type="body1" className={classes.infoRightAbout}>
                                        {user.biography}
                                    </Typography>
                                )}

                            </div>
                        </Paper>
                    </Hidden>
                )}

            </div>

        </div>

    }
}

ScoutProfile.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};


export default compose(withStyles(styleSheet), withWidth())(ScoutProfile);