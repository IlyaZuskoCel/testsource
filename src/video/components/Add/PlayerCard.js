import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import {Typography, Button, Hidden, Switch} from 'material-ui';
import {Link, Icon} from '../../../common/components';

import {Card} from "./Card";

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
        minHeight: 270,
        [theme.breakpoints.down('md')]: {
            width: 512,
            margin: '0 auto'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            minHeight:171,
            height: 200,
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
    infoLeft: {
        display: 'inline-block',
        position: 'relative',
        minHeight: 270,
        width: '40%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: 200,
            minHeight: 'auto',
        },
    },
    infoLeftPhoto: {
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        maxHeight: '100%',
        minHeight: '100%',
        width: '100%',
        objectFit: 'cover',
    },
    infoRight: {
        width: 300,
        boxSizing: 'border-box',
        padding: '20px 10px 30px 25px',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 0 30px 10px',
            width: '60%',
        },
    },
    infoRightColumn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    infoRightName: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize:34,
        [theme.breakpoints.down('sm')]: {
            fontSize:20,
            lineHeight:'20px'
        },
    },
    infoRightNameInfo: {
        fontSize: 12,
        marginTop: -12,
        marginBottom: 20,
        [theme.breakpoints.down('md')]: {
            marginTop: -5,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
            marginTop: 0,
        },
    },
    infoRightCaption: {
        fontSize: 10,
        paddingBottom: 4,
        [theme.breakpoints.down('sm')]: {
            fontSize: 8,
            marginBottom: 5,
            paddingBottom: 2,
            lineHeight: 0,
        },
    },
    infoRightValue: {
        fontFamily: 'UnitedSerifCond-Bold',
        fontSize: 20,
        lineHeight: '16px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
            marginTop: 5,
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
    infoRow: {
        display: 'inline-block',
        marginRight: 40,
        [theme.breakpoints.down('lg', 'sm')]: {
            marginRight: 30,
        },
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

    handlePlayerCard = (event, checked) => {
        return this.props.updateField('player_card', checked ? 1 : 0);
    };
    render() {
        const {classes, video} = this.props;
        return <div className={classes.root}>
            <Typography className={classes.title} type="subheading" align="center">
                Customize your player card
            </Typography>
            <Typography className={classes.desc} type="body1">
                The player card and bio is taken from your profile. It will appear before your uploaded video as shown
                below. In order to update the information shown, please {' '}
                <Link to="/profile/edit" disabledUnderline>
                    <span className={classes.editProfileLink}>edit your profile.</span>
                </Link>
            </Typography>

            <Card {...this.props} />

            <div className={classes.enablePlayerCard}>
                <Typography type="caption">Enable your player card to appear on video playback.</Typography>
                <Switch checked={!!video.player_card} onChange={this.handlePlayerCard}/>
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