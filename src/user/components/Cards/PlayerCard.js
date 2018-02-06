/**
 * Created by kirill on 9/06/17.
 * moonion.com
 */


import React, {Component} from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import withWidth from 'material-ui/utils/withWidth';
import {Link, Icon} from '../../../common/components';


import {withStyles, createStyleSheet} from 'material-ui/styles';
import defaultPhoto from './assets/images/default-photo.png';
import videosIcon from './assets/images/videos.svg';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';


import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';


import moment from 'moment';


const styleSheet = createStyleSheet('Search', theme => ({

    resultCard: {
        height: 192,
        transition: theme.transitions.create('box-shadow', {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.ease,
        }),

        [theme.breakpoints.down('md')]: {
            height: 160,
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
            height: 120,
        }
    },

    leftStripe: {
        float: 'left',
        width: 4,
        height: 192,
        backgroundColor: '#d7001e',

        [theme.breakpoints.down('md')]: {
            height: 162
        },
    },

    playerPhoto: {
        maxWidth: 126,
        maxHeight: 126,

        [theme.breakpoints.down('md')]: {
            maxWidth: 96,
            maxHeight: 96,
        }
    },

    playerNameContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 150,
        flex: 1,

        [theme.breakpoints.down('md')]: {
            width: 120,
            height: 120,
        }
    },

    nameColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: 126,
        marginLeft: 20,


        [theme.breakpoints.down('md')]: {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },

        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
        }

    },
    nameFont: {
        fontSize: 40,
        marginTop: 20,

        [theme.breakpoints.down('md')]: {
            fontSize: 32,
        },

        [theme.breakpoints.down('md')]: {
            marginTop: 0,
        }
    },
    playerLeague: {},

    playerBottomInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#fff',
        padding: [0, 14]
    },

    playerBottomDivider: {
        width: 1,
        height: 24,
        borderLeft: 'solid 1px #cbcbcb',
        margin: [0, 8],
    },

    bottomPlayerText: {
        fontSize: 18,
    },

    lastItemInRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },

    editIcon: {
        fontSize: 18,
        color: '#c2a24d',
    },

    iconWrapper: {
        width: 20,
        height: 19,
    },


    playerImage: {
        display: 'flex',
        justifyContent: 'cetner',
        alignItems: 'center',
    },

    alertTitle: {
        color: '#000000',
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
    videosIcon: {
        marginRight: 4,
        marginTop: -4,
        width: 16,
        height: 16
    }

}));

const nameLengthTreshold = 12;
const lastnameLengthTreshold = 12;


class PlayerCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openRemoveAlert: false,
            openConfirmAlert: false,
            currentPlayer: null,
        }
    }

    follow = (event, player) => {
        event.preventDefault();

        this.setState({openConfirmAlert: true, currentPlayer: player}, () => {
            this.props.addFavorite && this.props.addFavorite(player.id);
        });
    };

    splitOnLength = (string, treshold) => {
        if (string.length > treshold) {
            return string.split(' ')[0];
        }
        return string;
    };


    unSubscribe = (event, player) => {
        event.preventDefault();
        this.setState({openRemoveAlert: true, currentPlayer: player});
    };

    handleDialogCancel = () => {
        this.setState({openRemoveAlert: false});
    };

    handleDialogDelete = () => {
        this.setState({openRemoveAlert: false}, () => {

            this.props.removeFavorite && this.props.removeFavorite(this.state.currentPlayer.id);
        });
    };

    handleDialogConfirm = () => {
        this.setState({openConfirmAlert: false});
    };

    render() {
        const {classes, player, role, width, ...props} = this.props;

        const smallWidth = width === 'sm' || width === 'xs';

        let userPhotoSrc = defaultPhoto;

        if (player.profile_picture) {
            userPhotoSrc = player.profile_picture;
        }

        if (smallWidth && player.profile_picture_96) {
            userPhotoSrc = player.profile_picture_96;
        } else if (player.profile_picture_126) {
            userPhotoSrc = player.profile_picture_126;
        }

        return (
            <div>
                <Dialog
                    open={this.state.openRemoveAlert}
                    ignoreBackdropClick
                    ignoreEscapeKeyUp>
                    <DialogTitle disableTypography>
                        <Typography type="subheading">
                            Remove {this.state.currentPlayer && this.state.currentPlayer.first_name} {this.state.currentPlayer && this.state.currentPlayer.last_name}
                            from your Shortlist
                        </Typography>
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleDialogCancel}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleDialogDelete} color="primary">
                            Remove
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog
                    open={this.state.openConfirmAlert}
                    ignoreBackdropClick
                    ignoreEscapeKeyUp>
                    <DialogTitle disableTypography>
                        <Typography type="subheading">
                            {this.state.currentPlayer && this.state.currentPlayer.first_name} {this.state.currentPlayer && this.state.currentPlayer.last_name}
                            was added to your shortlist
                        </Typography>
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleDialogConfirm} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                <Link to={`/profile/${player.id}`} disabledUnderline>
                    <Paper classes={{root: classes.resultCard}} elevation={1}>
                        <div className={classes.leftStripe}></div>

                        <div className={classes.playerInfo}>
                            <div
                                className={classNames(classes.infoCardPhotoWrap, {[classes.infoCardPhotoDefaultWrap]: !player.profile_picture})}>
                                <img
                                    className={classNames(classes.infoCardPhoto, {[classes.infoCardPhotoDefault]: !player.profile_picture})}
                                    src={userPhotoSrc}
                                    alt="Player's photo"/>

                            </div>

                            <div className={classes.playerNameContainer}>
                                <div className={classes.nameColumn}>
                                    <Typography type='title' className={classes.nameFont}>
                                        {this.splitOnLength(player.first_name, nameLengthTreshold)} {this.splitOnLength(player.last_name, lastnameLengthTreshold)}
                                    </Typography>
                                    <Typography type='caption'
                                                className={classes.playerLeague}>{player.team ? player.team : ''} {player.league_short ? player.league_short : ''}</Typography>
                                </div>
                            </div>
                        </div>

                        <div className={classes.playerBottomInfo}>

                            {player.position_short !== 'n/a' && <Typography type='body1'
                                                                            className={classes.bottomPlayerText}>{player.position_short}</Typography>}
                            {player.position_short !== 'n/a' &&
                            <div className={classes.playerBottomDivider}/>}

                            {player.height && player.height[0] > 0 && <Typography type='body1'
                                                                                  className={classes.bottomPlayerText}>{player.height[0] + "'" + player.height[1] + '"'}</Typography>}
                            {player.height && player.height[0] > 0 &&
                            <div className={classes.playerBottomDivider}/>}

                            {player.weight && <Typography type='body1'
                                                          className={classes.bottomPlayerText}>{parseInt(player.weight) + ' lbs'}</Typography>}
                            {player.weight && <div className={classes.playerBottomDivider}/>}

                            {player.birthday && <Typography type='body1'
                                                            className={classes.bottomPlayerText}>{moment(player.birthday).format("MMM. YYYY")}</Typography>}


                            {player.birthday && !!player.count_video && <div className={classes.playerBottomDivider}/>}
                            {!!player.count_video && <img src={videosIcon} className={classes.videosIcon}/>}
                            {!!player.count_video && <Typography type='body1'
                                                                 className={classes.bottomPlayerText}>{player.count_video}</Typography>}


                            {role && role !== 'Player' &&
                            <div className={classes.lastItemInRow}>
                                <div className={classes.playerBottomDivider}/>
                                {
                                    player.is_tagged ? <IconButton onClick={(event) => {
                                            this.unSubscribe(event, player)
                                        }} className={classes.iconWrapper}><Icon
                                            className={classes.editIcon}>star-full</Icon></IconButton> :
                                        <IconButton onClick={(event) => {
                                            this.follow(event, player)
                                        }} className={classes.iconWrapper}><Icon
                                            className={classes.editIcon}>star-empty</Icon></IconButton>
                                }
                            </div>}
                        </div>
                    </Paper>
                </Link>
            </div>
        );
    }
}

PlayerCard.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};


export default compose(withStyles(styleSheet), withWidth())(PlayerCard);