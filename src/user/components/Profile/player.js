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

import {Link, Icon} from '../../../common/components';
import {PLAYER_ROLE, SCOUT_ROLE, GENDER_FEMALE, GENDER_MALE, SHOT_LEFT, SHOT_RIGHT, POS_LIST} from '../../constants';

import FavoriteButton from '../../containers/FavoriteButton';
import ShareButton from '../ShareButton';


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
            right: 364,
            opacity: 0.8

        },

        [theme.breakpoints.down('xs')]: {
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
            width: 364,
        },

        [theme.breakpoints.down('xs')]: {
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
        marginBottom: 72

    },
    videoListWrap: {
        padding: '56px 80px'
    },
    desc: {
        padding: '16px 0'
    },
    point: {
        paddingTop: 32
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

        [theme.breakpoints.down('sm')]: {
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
    infoCardName: {
        fontSize: 32,
        letterSpacing: '0.2px'
    },
    info: {
        marginLeft: 20,
        marginRight: 20,
    },
    infoRow: {
        paddingTop: 15,
        paddingBottom: 15,

    },
    infoCaption: {
        color: '#000'
    },
    infoValue: {
        color: '#fff',
        textTransform: 'uppercase'
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
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 24,
            marginRight: 24,
            justifyContent: 'space-around',
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
        marginTop: 24
    },
    contactButton: {
        marginTop: 64
    },

    mobileContent: {
        marginTop: -2
    },
    tabs: {
        justifyContent: 'center',
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

    report = () => {
        this.props.report(this.props.user.id);
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

        const {classes, user, currentUser} = this.props;

        return <div className={classes.root}>
            <img className={classes.backgroundImg} src={playerBg}/>
            <div className={classes.backgroundRight}/>
            <div className={classes.backgroundLeft}/>
            <div className={classes.content}>

                {user.id !== currentUser.id ? (
                    <div className={classes.topNavigate}>
                        <Link to="/" onClick={this.props.goBack} invert disabledUnderline className={classes.backLink}>
                            <Icon>previous</Icon>
                            <Hidden xsDown><span className={classes.backTitle}>Back to search</span></Hidden></Link>
                        <div>
                            {this.props.currentUser.user_role === SCOUT_ROLE &&
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
                            <Hidden xsDown><Button color="primary" raised className={classes.addVideoButton}>Add a
                                Video</Button></Hidden>
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
                            {user.gender && (
                                <div className={classes.infoRow}>
                                    <Typography type="caption" className={classes.infoCaption}>Gender</Typography>
                                    <Typography type="body2" className={classes.infoValue}>
                                        {user.gender === GENDER_MALE ? 'Male' : 'Female'}
                                    </Typography>

                                </div>
                            )}
                            {user.shot && (
                                <div className={classes.infoRow}>
                                    <Typography type="caption" className={classes.infoCaption}>Shot</Typography>
                                    <Typography type="body2" className={classes.infoValue}>
                                        {user.shot === SHOT_RIGHT ? 'Right' : 'Left'}
                                    </Typography>

                                </div>
                            )}
                        </div>
                    </Hidden>
                    <Paper className={classes.infoCard} square>
                        {user.player_num && (
                            <Typography className={classes.infoCardNumber} type="title">{user.player_num}</Typography>)}


                        <div
                            className={classNames(classes.infoCardPhotoWrap, {[classes.infoCardPhotoDefaultWrap]: !user.profile_picture})}>
                            <img
                                className={classNames(classes.infoCardPhoto, {[classes.infoCardPhotoDefault]: !user.profile_picture})}
                                src={user.profile_picture || defaultPhoto}/>

                        </div>
                        <div className={classes.infoCardLeagueLine}>
                            <Typography type="body2" align="center" className={classes.infoCardLeague}>RW</Typography>

                        </div>
                        <div className={classes.infoCardData}>
                            <Hidden smUp>
                                <Typography type="headline" align="center"
                                            className={classes.infoCardName}>{user.full_name}</Typography>
                            </Hidden>
                            <Typography type="subheading" align="center" className={classes.infoCardTeam}>
                                {user.team_current_name || 'Team Unknown'}
                            </Typography>
                            <Typography type="body1" align="center">
                                {user.city || user.state || user.country ? `${user.city || ''}${user.state ? (user.city ? ', ' + user.state : user.state ) : ''} ${user.country ? (user.city || user.state ? ', ' + user.country : user.country ) : ''}` : 'Location Unknown'}
                            </Typography>

                        </div>
                    </Paper>
                    <Hidden xsDown>
                        <div className={classes.infoRight}>
                            <Typography type="headline" className={classes.infoRightName}>{user.full_name}</Typography>
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
                                        {user.position ? POS_LIST[user.position] : 'Unknown'}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography type="caption" className={classes.infoRightCaption}>
                                        Nationality
                                    </Typography>
                                    <Typography type="subheading" className={classes.infoRightValue}>
                                        {user.nationality ? user.nationalit : 'Unknown'}
                                    </Typography>
                                </div>
                            </div>
                            {user.bio && (
                                <Typography type="body1" className={classes.infoRightAbout}>{user.bio}</Typography>
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
                                Position
                            </Typography>
                            <Typography type="subheading" className={classes.infoRightValue}>
                                {user.position ? POS_LIST[user.position] : 'Unknown'}
                            </Typography>
                        </div>
                        <div>
                            <Typography type="caption" className={classes.infoRightCaption}>
                                Nationality
                            </Typography>
                            <Typography type="subheading" className={classes.infoRightValue}>
                                {user.nationality ? user.nationalit : 'Unknown'}
                            </Typography>
                        </div>
                    </div>
                </Hidden>
                <Hidden smUp>
                    <Paper square className={classes.mobileContent}>
                        <Tabs index={this.state.tab}
                              onChange={this.handleChangeTab}
                              className={classes.tabs}
                              centered fullWidth>
                            <Tab label="Videos"/>
                            <Tab label="Profile"/>
                            <Tab label="Contact"/>
                        </Tabs>
                    </Paper>
                </Hidden>

                <Hidden only={['xs']}>
                    <div>
                        <Paper className={classes.videoList} square>


                            {user.videos.length > 0 ? ( <div className={classes.videoListWrap}/>) : (

                                user.id !== currentUser.id ? (
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
                                            <Button color="primary" raised
                                                    className={classNames(classes.addVideoButton, classes.addVideoButtonDesc)}>
                                                Add a Video
                                            </Button> to highlight your skills
                                        </Typography>
                                        <Typography type="body1" className={classes.point}>2.
                                            <Link to="/user/edit" disabledUnderline>
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

                        {user.id !== currentUser.id && (

                            <div className={classes.contactContainer}>
                                <Typography type="title" className={classes.contactTitle}>
                                    Contact
                                </Typography>
                                <Grid container>
                                    <Grid item sm={3} xs={12}>

                                        {user.have_agent ? (
                                            <Typography type="body1">
                                                <strong>You are contacting this player’s agent.</strong> Responses will
                                                be send
                                                directly
                                                to your email as indicated.
                                            </Typography>
                                        ) : (
                                            <Typography type="body1">
                                                You can send a message to a player here. Responses will be send directly
                                                to your
                                                email as indicated.
                                            </Typography>
                                        )}

                                    </Grid>
                                    <Grid item sm={1} xs={1}/>
                                    <Grid item sm={8} xs={12}>
                                        <form onSubmit={this.sendMessage}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Your Email Address"
                                                    value={user.self_contact_information}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    className={classes.contactTextField}
                                                    label="Subject Line"
                                                    value={this.state.contactSubject}
                                                    onChange={this.handleChange('contactSubject')}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    className={classes.contactTextField}
                                                    label="Message"
                                                    value={this.state.contactMessage}
                                                    onChange={this.handleChange('contactMessage')}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button type="submit" color="primary" raised
                                                        className={classes.contactButton}>Send</Button>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Grid>

                            </div>
                        )}
                    </div>
                </Hidden>
            </div>

        </div>

    }
}

PlayerProfile.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(PlayerProfile);