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
import TextField from 'material-ui/TextField';
import Tabs, {Tab} from 'material-ui/Tabs';


import {absUrl} from '../../../common/helpers';

import {Link, Icon} from '../../../common/components';
import {
    PLAYER_ROLE,
    SCOUT_ROLE,
    GENDER_FEMALE,
    GENDER_MALE,
    SHOT_LEFT,
    SHOT_RIGHT,
    POS_LIST,
    SHOT_LIST
} from '../../constants';

import FavoriteButton from '../../containers/FavoriteButton';
import ShareButton from '../ShareButton';
import ReportButton from '../../containers/ReportButton';
import ContactForm from '../../containers/ContactForm';


import VideoList from '../../../video/containers/VideoList';


import playerBg from './assets/images/profile-player-background.jpg';
import defaultPhoto from './assets/images/default-photo.png';


const styleSheet = createStyleSheet('PlayerProfile', theme => ({
    root: {},
    content: {
        maxWidth: 1168,
        margin: 'auto',
        marginTop: 56,
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
        right: 'calc( ( 100% - 1440px ) / 2 + 832px)',

        height: 688,

        [theme.breakpoints.down('lg')]: {
            right: 728,
        },
        [theme.breakpoints.down('md')]: {
            right: 620,
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
        right: 'calc( ( 100% - 1440px ) / 2 + 80px)',
        width: 752,
        height: 688,
        opacity: 0.8,

        [theme.breakpoints.down('lg')]: {
            right: -24,
        },

        [theme.breakpoints.down('md')]: {
            right: -24,
            // width: 590,
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
        marginTop: 56,
    },
    videoListWrap: {
        padding: '56px 80px',
        marginBottom: 72,


        [theme.breakpoints.down('sm')]: {
            padding: 0,
            marginBottom: 8
        },
    },
    descTitle: {
        [theme.breakpoints.down('sm')]: {
            paddingTop: 32,
            paddingBottom: 8,
        },
    },
    desc: {
        padding: '16px 0'
    },
    point: {
        paddingTop: 32,
        [theme.breakpoints.down('sm')]: {
            paddingBottom: 96,
            color: '#9b9b9b'
        },
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
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#f7f7f7',
        position: 'relative',

        [theme.breakpoints.down('sm')]: {
            height: 324,
            width: 218,
        },


    },
    infoCardData: {
        backgroundImage: 'linear-gradient(196deg, #d1d1d1, rgba(255, 255, 255, 0.74) 53%, #d9d9d9)',
        height: 129,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: [0, 8],
        [theme.breakpoints.down('sm')]: {
            height: 132,
            backgroundImage: 'none',
            backgroundColor: '#ffffff'
        },
    },
    infoCardNumber: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10,
        backgroundImage: 'linear-gradient(312deg, #c39e3d, #ddc674)',
        backgroundClip: 'text',
        '-webkitBackgroundClip': 'text',
        textFillColor: 'transparent',
        color: 'transparent',
        fontSize: 48,
        [theme.breakpoints.down('sm')]: {
            fontSize: 40,
            top: 8,
            left: 8,
        },

    },
    infoCardPhotoWrap: {
        width: 270,
        height: 270,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',

        [theme.breakpoints.down('sm')]: {
            height: 192,
            width: 218,
        },


    },
    infoCardPhotoDefaultWrap: {
        justifyContent: 'center',
    },
    infoCardPhoto: {
        maxWidth: 270,
        maxHeight: 270,
        [theme.breakpoints.down('sm')]: {
            height: 192,
            width: 218,
        },
    },
    infoCardPhotoDefault: {
        width: 176
    },
    infoCardLeagueLine: {
        height: 3,
        backgroundImage: 'linear-gradient(271deg, #c39e3d, #ddc674)',
        position: 'relative'

    },
    infoCardLeagueShield: {
        position: 'absolute',
        top: -24,
        left: '50%',
        marginLeft: -22,
        fontSize: 48,
        backgroundImage: 'linear-gradient(312deg, #c39e3d, #ddc674)',
        backgroundClip: 'text',
        '-webkitBackgroundClip': 'text',
        textFillColor: 'transparent',
        color: 'transparent',
        [theme.breakpoints.down('sm')]: {
            fontSize: 42,
            top: -21,
            marginLeft: -19,
            width: 38,
            height: 42,
            lineHeight: '42px',
        },
    },


    infoCardLeague: {
        position: 'absolute',
        top: -24,
        left: '50%',
        marginLeft: -22,
        width: 44,
        height: 48,
        color: '#fff',
        verticalAlign: 'middle',
        lineHeight: '48px',
        [theme.breakpoints.down('sm')]: {
            top: -21,
            marginLeft: -19,
            width: 38,
            height: 42,
            lineHeight: '42px',
        },

    },
    infoCardTeam: {},
    infoCardName: {
        fontSize: 32,
        letterSpacing: '0.2px'
    },
    info: {
        marginLeft: 20,
        marginRight: 20,

        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginLeft: 0,
            marginRight: 0,
            paddingBottom: 24,
        },

    },
    infoRow: {
        paddingTop: 15,
        paddingBottom: 15,
        [theme.breakpoints.down('sm')]: {
            paddingTop: 0,
            paddingBottom: 0,
        }
    },
    infoCaption: {
        color: '#000'
    },
    infoValue: {
        color: '#fff',
        textTransform: 'uppercase',
        [theme.breakpoints.down('sm')]: {
            color: '#000',
            textTransform: 'capitalize'
        },
    },
    infoRight: {
        width: 566,
        marginLeft: 20,
        marginRight: 20,
    },
    infoRightColumn: {
        marginTop: 24,
        marginBottom: 24,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 24,
            marginRight: 24,
            justifyContent: 'space-around',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
            marginRight: 0,
        },
    },
    infoRightName: {
        textTransform: 'uppercase',
        letterSpacing: '2.8px'
    },
    infoRightCaption: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.up('sm')]: {
            color: '#000',
        },
    },
    infoRightValue: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },

    },
    infoRightAbout: {
        fontSize: 16,
        lineHeight: 1.5,

        [theme.breakpoints.down('sm')]: {
            paddingBottom: 16,
            fontSize: 14,
            lineHeight: 1.71,
        }

    },
    contactContainer: {
        padding: 80,
        paddingTop: 0,
    },
    contactTitle: {
        paddingBottom: 40
    },
    contactTextField: {
        width: '100%',
        marginTop: 24,
        [theme.breakpoints.down('sm')]: {
            marginTop: 8,
        }

    },
    contactButton: {
        marginTop: 64,
        [theme.breakpoints.down('sm')]: {
            marginTop: 40,
            marginBottom: 40,
        }
    },

    mobileContent: {
        marginTop: -2
    },
    tabs: {
        justifyContent: 'center',
    },
    tabContent: {
        padding: 16,
        paddingTop: 24,
    },
    addVideoFloat: {
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
        backgroundImage: 'linear-gradient(315deg, #f55e58, #c9011b)'
    },
    addVideoFloatDesc: {
        position: 'relative',
        bottom: 'auto',
        right: 'auto',
        backgroundColor: '#e2e2e2',
        backgroundImage: 'none',
        boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.3)',
        width: 36,
        height: 36,
        marginLeft: 10,
        marginRight: 10,
    }
}));


class PlayerProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openUserMenu: false,
            anchorUserMenuEl: undefined,
            contactSubject: '',
            contactMessage: '',
            tab: 0

        };

    }

    toggleUserMenu = (event) => {

        let state = {openUserMenu: !this.state.openUserMenu};
        if (!this.state.openUserMenu)
            state.anchorUserMenuEl = event.currentTarget;

        this.setState(state)
    };

    sendMessage = (e) => {
        e.preventDefault();
        this.props.sendEmail(this.props.user.id, this.state.contactSubject, this.state.contactMessage);
        this.setState({
            contactSubject: '',
            contactMessage: ''
        });
        return false;
    };
    handleChangeTab = (event, tab) => {
        this.setState({tab});
    };

    handleChange = name => event => this.setState({[name]: event.target.value});


    render() {

        const {classes, user, currentUser, isCurrent} = this.props;

        return <div className={classes.root}>
            <div className={classes.backgroundImgWrap}>
                <img className={classes.backgroundImg} src={playerBg}/>
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
                            {currentUser && currentUser.role === SCOUT_ROLE &&
                            <FavoriteButton user={user.id} active={user.is_tagged}/>}

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
                            <Hidden xsDown>
                                <Link to="/video/add" disabledUnderline>
                                    <Button color="primary" raised className={classes.addVideoButton}>
                                        Add a Video
                                    </Button>
                                </Link>
                            </Hidden>
                        </div>
                    </div>
                )}

                <div className={classes.infoContainer}>
                    <Hidden smDown>
                        <div className={classes.info}>
                            {user.height && (user.height[0] > 0 || user.height[1] > 0 ) && (
                                <div className={classes.infoRow}>
                                    <Typography type="caption" className={classes.infoCaption}>Height</Typography>
                                    <Typography type="body2" className={classes.infoValue}>
                                        {`${user.height[0]}'${user.height[1]}''`}
                                    </Typography>

                                </div>
                            )}
                            {user.weight && (
                                <div className={classes.infoRow}>
                                    <Typography type="caption" className={classes.infoCaption}>Weight</Typography>
                                    <Typography type="body2" className={classes.infoValue}>
                                        {user.weight} lbs
                                    </Typography>

                                </div>
                            )}
                            {user.gender_full && (
                                <div className={classes.infoRow}>
                                    <Typography type="caption" className={classes.infoCaption}>Gender</Typography>
                                    <Typography type="body2" className={classes.infoValue}>
                                        {user.gender_full}
                                    </Typography>

                                </div>
                            )}
                            {user.shot && (
                                <div className={classes.infoRow}>
                                    <Typography type="caption" className={classes.infoCaption}>Shot</Typography>
                                    <Typography type="body2" className={classes.infoValue}>
                                        {SHOT_LIST[user.shot]}
                                    </Typography>

                                </div>
                            )}
                        </div>
                    </Hidden>
                    <Paper className={classes.infoCard} square>
                        {user.jersey_number && (
                            <Typography className={classes.infoCardNumber}
                                        type="headline">{user.jersey_number}</Typography>)}


                        <div
                            className={classNames(classes.infoCardPhotoWrap, {[classes.infoCardPhotoDefaultWrap]: !user.profile_picture})}>
                            <img
                                className={classNames(classes.infoCardPhoto, {[classes.infoCardPhotoDefault]: !user.profile_picture})}
                                src={user.profile_picture || defaultPhoto}/>

                        </div>
                        <div className={classes.infoCardLeagueLine}>
                            <Icon className={classes.infoCardLeagueShield}>shield</Icon>
                            <Typography type="body2" align="center"
                                        className={classes.infoCardLeague}>{user.position_short || '/'}</Typography>

                        </div>
                        <div className={classes.infoCardData}>
                            <Hidden smUp>
                                <Typography type="headline" align="center"
                                            className={classes.infoCardName}>{user.first_name} {user.last_name}</Typography>
                            </Hidden>
                            <Typography type="subheading" align="center" className={classes.infoCardTeam}>
                                {!!!user.team_status && user.team && 'Other / '}{user.team || 'Team Unknown'}
                                {!!!user.league_status && user.league && ' - Other / '}{user.league_short ? ' - ' + user.league_short : (!!!user.league_status ? user.league : '')}
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
                            <div className={classes.infoRightColumn}>
                                <div>
                                    <Typography type="caption" className={classes.infoRightCaption}>
                                        Birth Date
                                    </Typography>
                                    <Typography type="subheading" className={classes.infoRightValue}>
                                        {user.birthday ? moment(user.birthday).format('MMM. YYYY') : 'Unknown'}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography type="caption" className={classes.infoRightCaption}>
                                        Position
                                    </Typography>
                                    <Typography type="subheading" className={classes.infoRightValue}>
                                        {user.position_full || 'Unknown'}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography type="caption" className={classes.infoRightCaption}>
                                        Nationality
                                    </Typography>
                                    <Typography type="subheading" className={classes.infoRightValue}>
                                        {user.nationality_code || 'Unknown'}
                                    </Typography>
                                </div>
                            </div>
                            {user.biography && (
                                <Typography type="body1"
                                            className={classes.infoRightAbout}>{user.biography}</Typography>
                            )}
                        </div>
                    </Hidden>
                </div>

                <Hidden smUp>
                    <div className={classes.infoRightColumn}>
                        <div>
                            <Typography type="caption" className={classes.infoRightCaption}>
                                Birth Date
                            </Typography>
                            <Typography type="subheading" className={classes.infoRightValue}>
                                {user.birthday ? moment(user.birthday).format('MMM. YYYY') : 'Unknown'}
                            </Typography>
                        </div>
                        <div>
                            <Typography type="caption" className={classes.infoRightCaption}>
                                Nationality
                            </Typography>
                            <Typography type="subheading" className={classes.infoRightValue}>
                                {user.nationality_code || 'Unknown'}
                            </Typography>
                        </div>
                        <div>
                            <Typography type="caption" className={classes.infoRightCaption}>
                                Position
                            </Typography>
                            <Typography type="subheading" className={classes.infoRightValue}>
                                {user.position_full || 'Unknown'}
                            </Typography>
                        </div>

                    </div>
                </Hidden>
                <Hidden smUp>
                    <Paper square className={classes.mobileContent}>
                        {!isCurrent && currentUser && currentUser.role === SCOUT_ROLE ? (
                            <Tabs index={this.state.tab}
                                  onChange={this.handleChangeTab}
                                  className={classes.tabs}
                                  centered fullWidth>
                                <Tab label="Videos"/>
                                <Tab label="Profile"/>
                                <Tab label="Contact"/>
                            </Tabs>
                        ) : (
                            <Tabs index={this.state.tab}
                                  onChange={this.handleChangeTab}
                                  className={classes.tabs}
                                  centered fullWidth>
                                <Tab label="Videos"/>
                                <Tab label="Profile"/>
                            </Tabs>
                        )}


                        {this.state.tab === 0 && user.videos.length > 0 && (
                            <div className={classes.tabContent}>
                                <VideoList className={classes.videoListWrap} videos={user.videos}
                                           tagCounts={user.tags_isset}/>
                            </div>
                        )}

                        {this.state.tab === 0 && user.videos.length <= 0 && !isCurrent && (
                            <div className={classes.tabContent}>
                                <Typography type="subheading" align="center">
                                    This player hasn't uploaded any video yet.
                                </Typography>
                            </div>
                        )}

                        {this.state.tab === 0 && user.videos.length <= 0 && isCurrent && (
                            <div className={classes.tabContent}>
                                <Typography type="subheading" align="center" className={classes.descTitle}>Your profile
                                    is
                                    incomplete!</Typography>
                                <Typography type="body1" align="center" className={classes.desc}>
                                    Scouts are actively looking for talents like you. Here is what
                                    they look for:
                                </Typography>
                                <Typography type="body1" align="center" className={classes.point}> Tap
                                    <Link to="/video/add" disabledUnderline>
                                        <Button fab color="primary" raised
                                                className={classNames(classes.addVideoFloat, classes.addVideoFloatDesc)}>
                                            <Icon>plus</Icon>
                                        </Button>
                                    </Link>
                                    to upload a video
                                </Typography>
                            </div>
                        )}


                        {this.state.tab === 1 && (
                            <div className={classes.tabContent}>
                                <div className={classes.info}>
                                    {user.height && (user.height[0] > 0 || user.height[1] > 0 ) && (
                                        <div className={classes.infoRow}>
                                            <Typography type="caption"
                                                        className={classes.infoCaption}>Height</Typography>
                                            <Typography type="body2" className={classes.infoValue}>
                                                {`${user.height[0]}'${user.height[1]}''`}
                                            </Typography>

                                        </div>
                                    )}
                                    {user.weight && (
                                        <div className={classes.infoRow}>
                                            <Typography type="caption"
                                                        className={classes.infoCaption}>Weight</Typography>
                                            <Typography type="body2" className={classes.infoValue}>
                                                {user.weight} lbs
                                            </Typography>

                                        </div>
                                    )}
                                    {user.gender_full && (
                                        <div className={classes.infoRow}>
                                            <Typography type="caption"
                                                        className={classes.infoCaption}>Gender</Typography>
                                            <Typography type="body2" className={classes.infoValue}>
                                                {user.gender_full}
                                            </Typography>

                                        </div>
                                    )}
                                    {user.shot && (
                                        <div className={classes.infoRow}>
                                            <Typography type="caption" className={classes.infoCaption}>Shot</Typography>
                                            <Typography type="body2" className={classes.infoValue}>
                                                {SHOT_LIST[user.shot]}
                                            </Typography>

                                        </div>
                                    )}
                                </div>
                                {user.biography && (
                                    <Typography type="body1"
                                                className={classes.infoRightAbout}>{user.biography}</Typography>
                                )}

                            </div>
                        )}

                        {this.state.tab === 2 && !isCurrent && (currentUser && currentUser.role === SCOUT_ROLE) && (
                            <div className={classes.tabContent}>
                                <ContactForm user={user}/>
                            </div>
                        )}

                        {isCurrent && (
                            <Link to="/video/add" disabledUnderline>
                                <Button fab color="primary" raised className={classes.addVideoFloat}>
                                    <Icon>plus</Icon>
                                </Button>
                            </Link>
                        )}

                    </Paper>


                </Hidden>

                <Hidden only={['xs']}>
                    <div>
                        <Paper className={classes.videoList} square>


                            {user.videos.length > 0 ? (
                                <VideoList className={classes.videoListWrap} videos={user.videos}
                                           tagCounts={user.tags_isset}/>
                            ) : (

                                !isCurrent ? (
                                    <div className={classes.videoListWrap}>
                                        <Typography type="subheading" align="center">
                                            This player hasn't uploaded any video yet.
                                        </Typography>
                                    </div>

                                ) : (
                                    <div className={classes.videoListWrap}>
                                        <Typography type="subheading">Your profile is
                                            incomplete!</Typography>
                                        <Typography type="body1" className={classes.desc}>
                                            Scouts are actively looking for talents like you. Here is what
                                            they look for:
                                        </Typography>
                                        <Typography type="body1" className={classes.point}>1.
                                            <Link to="/video/add" disabledUnderline>
                                                <Button color="primary" raised
                                                        className={classNames(classes.addVideoButton, classes.addVideoButtonDesc)}>
                                                    Add a Video
                                                </Button>
                                            </Link> to highlight your skills
                                        </Typography>
                                        <Typography type="body1" className={classes.point}>2.
                                            <Link to="/profile/edit" disabledUnderline>
                                                <Button className={classes.editButton}>
                                                    <Icon className={classes.editIcon}>pencil</Icon>
                                                    <span>Edit</span>
                                                </Button>
                                            </Link> your profile information
                                        </Typography>
                                    </div>
                                )

                            )}


                        </Paper>

                        {!isCurrent && currentUser && currentUser.role === SCOUT_ROLE && (

                            <div className={classes.contactContainer}>
                                <Typography type="title" className={classes.contactTitle}>
                                    Contact
                                </Typography>
                                <ContactForm user={user}/>

                            </div>
                        )}
                    </div>
                </Hidden>


            </div>


        </div>

    }
};

PlayerProfile.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(PlayerProfile);