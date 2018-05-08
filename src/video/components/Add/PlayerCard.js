/**
 * Created by Vitaly on 04/21/2017.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import {Link, Icon} from '../../../common/components';
import Switch from 'material-ui/Switch';
import defaultPhoto from '../../../user/components/Profile/assets/images/default-photo.png';
import {RangeSlider} from '../../../common/components';
import {
    SHOT_LIST
} from '../../../user/constants';

const styleSheet = createStyleSheet('PlayerCard', theme => ({
    root: {
        [theme.breakpoints.down('md')]: {
            paddingLeft: 16,
            paddingRight: 16,
        }
    },
    title: {
        [theme.breakpoints.down('md')]: {
            textAlign: "left"
        }
    },
    desc: {
        marginTop: 32,
        marginBottom: 32,

    },
    uploadWrap: {
        marginBottom: 7,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    range: {
        padding: 16,
        position: 'relative'
    },
    buttons: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    videoWrap: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        //backgroundColor: '#000',
        minHeight: 270,
        [theme.breakpoints.down('md')]: {
            width: 512,
            margin: '0 auto'
        },
        [theme.breakpoints.down('sm')]: {
            width: 306,
            minHeight:171,
            margin: '0 auto'
        },
    },
    video: {
        width: '100%',
        maxHeight: 264,
        backgroundColor: '#000',
    },
    editProfileLink: {
        fontSize: 18,
        fontWeight: 500
    },
    enablePlayerCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        [theme.breakpoints.down('md')]: {
            marginLeft: 20,
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    infoCard: {
        width: 170,
        minHeight: 220,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#f7f7f7',
        position: 'relative',

        [theme.breakpoints.down('sm')]: {
            minHeight: 138,
            width: 100,
            marginLeft: 10,
            marginRight: 10,
        },

    },
    infoCardDataBottom: {
        position: "absolute",
        bottom: 0,
        width:"100%",
        backgroundColor: '#ffffff'
    },
    infoCardData: {
        backgroundImage: 'linear-gradient(196deg, #d1d1d1, rgba(255, 255, 255, 0.74) 53%, #d9d9d9)',
        minHeight: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: [24, 8, 8],
        [theme.breakpoints.down('sm')]: {
            padding: [5, 0, 0],
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
        width: 156,
        height: 135,
        overflow: 'hidden',
        position: 'relative',
        margin: 'auto',

        [theme.breakpoints.down('sm')]: {
            height: 80,
            width: 100,
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
        [theme.breakpoints.down('sm')]: {
            minWidth: '50%',
            minHeight: '50%',
        },

    },
    infoCardPhotoDefault: {
        width: 176,
        [theme.breakpoints.down('sm')]: {
            width:100
        },
    },
    infoCardLeagueLine: {
        height: 3,
        backgroundImage: 'linear-gradient(271deg, #c39e3d, #ddc674)',
        position: 'relative'

    },
    infoCardLeagueShield: {
        position: 'absolute',
        top: -15,
        left: '54%',
        marginLeft: -22,
        fontSize: 32,
        backgroundImage: 'linear-gradient(312deg, #c39e3d, #ddc674)',
        backgroundClip: 'text',
        '-webkitBackgroundClip': 'text',
        textFillColor: 'transparent',
        color: 'transparent',
        [theme.breakpoints.down('sm')]: {
            top: -8,
            left: '60%',
            fontSize: 17,
            marginLeft: '-18px'
        },
    },
    infoCardLeague: {
        position: 'absolute',
        top: -24,
        fontSize:17,
        left: '50%',
        marginLeft: -22,
        width: 44,
        height: 48,
        color: '#fff',
        verticalAlign: 'middle',
        lineHeight: '48px',
        [theme.breakpoints.down('sm')]: {
            top: -22,
            fontSize:11,
        },


    },
    infoCardTeam: {
        fontSize:20,
        [theme.breakpoints.down('sm')]: {
            fontSize:15,
        },

    },
    infoCardLocation:{
        fontSize:13,
        [theme.breakpoints.down('sm')]: {
            fontSize:10,
        },
    },
    infoCardName: {
        marginTop: 8,
        fontSize: 32,
        lineHeight: 0.97,
        letterSpacing: '0.2px'
    },
    infoRight: {
        width: 300,
        marginLeft: 20,
        marginRight: 20,
        marginTop:-30,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 10,
            marginRight: 10,
            marginTop:0,
        },
    },
    infoRightColumn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    infoRightName: {
        fontSize:34,
        textTransform: 'uppercase',
        [theme.breakpoints.down('sm')]: {
            fontSize:20,
            lineHeight:'20px'
        },
    },
    infoRightCaption: {
        fontSize:10,
        paddingBottom: 4,
        [theme.breakpoints.down('sm')]: {
            fontSize:8,
            paddingBottom: 2,
            lineHeight:0,
            marginTop:5,
        },
    },
    infoRightValue: {
        fontSize:20,
        lineHeight:'16px',
        [theme.breakpoints.down('sm')]: {
            fontSize:11,
        },

    },
    infoRightAbout: {
        fontSize: 16,
        lineHeight: 1.5,
        wordWrap: "break-word",

    },
    pendingVerification: {
        marginTop: 16,
    },
    info: {

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 0,
            marginRight: 0,
            paddingBottom: 24,
            marginTop: 24,
            [theme.breakpoints.down('sm')]: {
                marginTop: 10,
            },



    },
    infoRow: {

    },
    infoCaption: {
        fontSize:10,
        paddingBottom: 4,
        lineHeight:0,
        [theme.breakpoints.down('sm')]: {
            fontSize:8,
            paddingBottom: 2,
        },
    },
    infoValue: {
        textTransform: 'uppercase',
        color: '#d7001e',
        fontSize: 14,
        [theme.breakpoints.down('sm')]: {
            fontSize:11,
        },
    },

}));


class PlayerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {classes, video, user} = this.props;
        let userPhotoSrc = defaultPhoto;
        if (user.profile_picture) {
            userPhotoSrc = user.profile_picture;
        }
        return <div className={classes.root}>
            <Typography className={classes.title} type="subheading" align="center">
                Customize your player card
            </Typography>
            <Typography className={classes.desc} type="body1">
                The player card and bio is taken from your profile. It will appear before your uploaded video as shown below. In order to update the information shown, please {' '}
                <Link to="/profile/edit" disabledUnderline>
                    <span className={classes.editProfileLink}>edit your profile.</span>
                </Link>
            </Typography>


            <Paper className={classNames(classes.uploadWrap, classes.videoWrap)}>
                <Paper className={classes.infoCard} square>
                    {user.jersey_number && (
                        <Typography className={classes.infoCardNumber}
                                    type="headline">{user.jersey_number}</Typography>)}


                    <div
                        className={classNames(classes.infoCardPhotoWrap, {[classes.infoCardPhotoDefaultWrap]: !user.profile_picture})}>
                        <img
                            className={classNames(classes.infoCardPhoto, {[classes.infoCardPhotoDefault]: !user.profile_picture})}
                            src={userPhotoSrc}/>

                    </div>
                    <div className={classes.infoCardDataBottom}>
                        <div className={classes.infoCardLeagueLine}>
                            <Icon className={classes.infoCardLeagueShield}>shield</Icon>
                            <Typography type="body2" align="center"
                                        className={classes.infoCardLeague}>{user.position_short || '/'}</Typography>

                        </div>
                        <div className={classes.infoCardData}>
                                {/*<Typography type="headline" align="center"*/}
                                            {/*className={classes.infoCardName}>{user.first_name} {user.last_name}</Typography>*/}
                            <Typography type="subheading" align="center" className={classes.infoCardTeam}>
                                {user.team || 'Team Unknown'}
                                {user.league_short ? ' - ' + user.league_short : (!user.league_status ? user.league : '')}
                                {(!user.team_status && user.team || !user.league_status && user.league) && "*"}
                            </Typography>
                            <Typography type="body1" align="center" className={classes.infoCardLocation}>
                                {user.country || (user.team_location !== 'n/a' && user.team_location) || user.team_country || 'Location Unknown'}
                            </Typography>
                            {(!user.team_status && user.team || !user.league_status && user.league) && (
                                <Typography type="caption" align="center" className={classes.pendingVerification}>
                                    *Pending verification by Scout Zoo.
                                </Typography>
                            )}


                        </div>
                    </div>
                </Paper>
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
                    <div className={classes.info}>
                        {user.height && (user.height[0] > 0 || user.height[1] > 0) && (
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
                                    {parseFloat(user.weight)} lbs
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
                </div>
            </Paper>
            <div className={classes.enablePlayerCard}>
                <Typography type="caption">Enable your player card to appear on video playback.</Typography>
                <Switch/>
            </div>

            <div className={classes.buttons}>
                <Button onClick={this.props.onPrev} raised>
                    Previous
                </Button>

                <Hidden only={['md', 'lg', 'xl']}>
                    <Button onClick={this.props.onNext} raised
                            color={this.state.time_end - this.state.time_start > 60000 ? 'default' : 'primary'}
                            disabled={this.state.time_end - this.state.time_start > 60000}>
                        Next
                    </Button>
                </Hidden>

            </div>
        </div>;
    }
}

PlayerCard.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PlayerCard);