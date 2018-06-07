/**
 * Created by kirill on 8/22/17.
 * moonion.com
 */
import React, {Component} from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Tabs, {Tab} from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import withWidth from 'material-ui/utils/withWidth';
import {Link, Icon} from '../../../common/components';
import classNames from 'classnames';
import Hidden from 'material-ui/Hidden';


import {withStyles, createStyleSheet} from 'material-ui/styles';
import defaultPhoto from './assets/images/default-photo.png';

import verifiedImage from '../../../assets/image/check.png';

const nameLengthTreshold = 12;
const lastnameLengthTreshold = 12;


const styleSheet = createStyleSheet('Scout', theme => ({
    content: {
        maxWidth: 1168,
        width: '100%',
        margin: 'auto',
    },
    resultContainer: {
        padding: [40, 0],

        [theme.breakpoints.down('md')]: {
            padding: [40, 15]
        }
    },
    resultCard: {
        height: 150,

        transition: theme.transitions.create('box-shadow', {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.ease,
        }),

        [theme.breakpoints.down('md')]: {
            height: 'auto',
            minHeight: 120,
        },

        "&:hover": {
            boxShadow: "0px 3px 14px 0 rgba(0, 0, 0, 0.2)",
        }
    },
    playerInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage: "linear-gradient(to bottom, #f3f3f3, rgba(255, 255, 255, 0.5))",
        height: 150,
        boxSizing: 'border-box',
        padding: [12, 15],
        flex: 1,

        [theme.breakpoints.down('md')]: {
            height: 'auto',
            minHeight: 120,
        }
    },

    leftStripe: {
        float: 'left',
        width: 4,
        height: 150,
        backgroundColor: '#d7001e',

        [theme.breakpoints.down('md')]: {
            minHeight: 120,
            maxHeight: 145,
        },
    },

    playerPhoto: {
        width: 126,
        height: 126,

        [theme.breakpoints.down('md')]: {
            width: 96,
            height: 96,
            justifyContent: 'space-around'
        }
    },

    playerNameContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 150,
        flex: 1,

        [theme.breakpoints.down('md')]: {
            width: 120,
            height: 'auto',
            minHeight: 120,
        }
    },

    nameColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1,
        height: 150,
        marginLeft: 30,


        [theme.breakpoints.down('md')]: {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: 120,
            marginLeft: 15,
        }
    },
    nameFont: {
        lineHeight: 1,
        letterSpacing: 0.4,
        textAlign: 'left',

        [theme.breakpoints.down('md')]: {
            fontSize: 32,
        }

    },

    nameFontFirst: {
        marginTop: 13,

        [theme.breakpoints.down('md')]: {
            marginTop: 10,
        },

    },
    scoutRole: {
        margin: [0, 0, 2, 0],
        lineHeight: 1.33,
        overflow: 'hidden',
        height: 22,

        [theme.breakpoints.down('md')]: {
            fontSize: 16,
        }
    },
    photoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',

        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
            height: '100%'
        }
    },
    total: {
        display: 'flex',


        [theme.breakpoints.down('md')]: {
            marginLeft: 20,
            justifyContent: 'center',
            alignItems: 'center',
        }
    },

    specificContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    specificText: {
        marginBottom: 20,
    },
    infoCardPhotoWrap: {
        width: 126,
        height: 126,
        overflow: 'hidden',
        position: 'relative',
        margin: 'auto',

        [theme.breakpoints.down('md')]: {
            height: 96,
            width: 96,
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
        width: 126,
        [theme.breakpoints.down('md')]: {
            width: 96,
        }
    },
    verifiedImage: {
        width: 16,
        paddingLeft: 4,
    }
}));


const getPhotoUrl = (user, width) => {
    let userPhotoSrc = defaultPhoto;

    if (user.profile_picture) {
        userPhotoSrc = user.profile_picture;
    }

    if (width === "xs" && user.profile_picture_96) {
        userPhotoSrc = user.profile_picture_96;
    } else if (user.profile_picture_126) {
        userPhotoSrc = user.profile_picture_126;
    }

    return userPhotoSrc;
};

class Scouts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scouts: null,
        }

        this.roleShortener = this.roleShortener.bind(this);
    }

    componentWillReceiveProps(nextProp) {
        this.setState({scouts: nextProp.scouts});
    }

    splitOnLength = (string, treshold) => {
        if (string.length > treshold) {
            return string.split(' ')[0];
        }
        return string;
    };


    roleShortener(role) {
        let result;
        if (/\//.test(role)) {
            result = role.split('/')[0];
        }

        return result ? result : role;
    }

    handleClick = (scout, event) => {
        if(!this.props.currentUser && scout.is_private)
            event.preventDefault();
            this.props.showPopUp('You must be logged in to view this profile');
    }


    render() {
        const {classes, width} = this.props;


        return (
            <div className={classes.content}>
                <div className={classes.total}>
                    <Typography type="caption">{this.props.total ? this.props.total : 0} scout{(this.props.total && this.props.total > 1) ? 's' : ''} found</Typography>
                </div>
                <div className={classes.resultContainer}>

                    {this.props.total === 0 && <Hidden smUp>
                        <div className={classes.specificContainer}>
                            <div className={classes.specificText}><Typography type="body2">Your search might be too
                                specific</Typography></div>
                            <div><Typography type="caption">Try reducing the number of filters.</Typography></div>
                        </div>
                    </Hidden>}


                    <Grid container gutter={40} justify="center">

                        {this.state.scouts && this.state.scouts.map(scout => {
                            return <Grid item xs={12} md={6} key={scout.id}>
                                <Link  onClick={(event)=>this.handleClick(scout, event)} to={`/profile/${scout.id}`} disabledUnderline>
                                    <Paper classes={{root: classes.resultCard}} elevation={1} >
                                        <div className={classes.leftStripe}></div>

                                        <div className={classes.playerInfo}>


                                            <div
                                                className={classNames(classes.infoCardPhotoWrap, {[classes.infoCardPhotoDefaultWrap]: !scout.profile_picture})}>
                                                <img
                                                    className={classNames(classes.infoCardPhoto, {[classes.infoCardPhotoDefault]: !scout.profile_picture})}
                                                    src={getPhotoUrl(scout, width)}
                                                    alt="Scout's photo"/>

                                            </div>
                                            <div className={classes.playerNameContainer}>
                                                <div className={classes.nameColumn}>
                                                    <Typography type='title'
                                                                className={classNames(classes.nameFont, classes.nameFontFirst)}>
                                                        {this.splitOnLength(scout.first_name, nameLengthTreshold)}
                                                    </Typography>
                                                    <Typography type='title' className={classes.nameFont}>
                                                        {this.splitOnLength(scout.last_name, lastnameLengthTreshold)}
                                                        {!!scout.is_confirmed &&
                                                        <img src={verifiedImage} className={classes.verifiedImage}/>}
                                                    </Typography>


                                                    {scout.job_title && <Typography type="body1"
                                                                                    className={classes.scoutRole}>{this.roleShortener(scout.job_title)}</Typography>}
                                                    <Typography type='caption'
                                                                className={classes.playerLeague}>{scout.league || 'Unknown'}</Typography>
                                                </div>
                                            </div>
                                        </div>

                                    </Paper>
                                </Link>
                            </Grid>
                        })}
                    </Grid>
                </div>
            </div>
        )
    }
}

Scouts.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(Scouts);