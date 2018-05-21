import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import Hidden from '../../../common/components/Hidden';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Tabs, {Tab} from 'material-ui/Tabs';
import Icon from 'material-ui/Icon';

import {absUrl} from '../../../common/helpers';
import ShareButton from '../../../user/components/ShareButton';

import {Link, Icon as ScoutZooIcon} from '../../../common/components';

import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';

import playerBg from './assets/images/profile-player-background.jpg';

const getTime = (start, end) => {
    const value = end - start;

    if (value === 0) return '0:00';

    const duration = moment.duration(value);
    let time = '';

    time += ('0' + duration.get('minutes')).slice(-1) + ':';

    time += ('00' + duration.get('seconds')).slice(-2);

    return time;
};

const styleSheet = createStyleSheet('VideoItem', theme => ({
    root: {},
    content: {
        maxWidth: 1140,
        margin: 'auto',
        marginTop: 56,
        marginBottom: 125,
        padding: [0, 48],
        [theme.breakpoints.down('md')]: {
            marginTop: 0,
            marginBottom: 40,
            padding: [0, 16]
        },

    },

    backgroundImgWrap: {
        zIndex: -1,
        width: '100%',

        height: 688,
        [theme.breakpoints.down('md')]: {
            height: 767,

        },
        [theme.breakpoints.down('sm')]: {
            height: 630,

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
            height: 767,
            right: 620,
        },


        [theme.breakpoints.down('sm')]: {
            height: 630,
            right: 345,
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
            height: 767,
        },

        [theme.breakpoints.down('sm')]: {
            right: 0,
            height: 630,
            width: 345,
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

    backLink: {
        textTransform: 'uppercase',
        [theme.breakpoints.down('md')]: {
            fontSize: 18,
        },

    },
    backTitle: {
        marginLeft: 16
    },

    videoWrap: {
        position: 'relative',
        width: '100%',
        backgroundColor: '#000',
        textAlign: 'center',
        maxHeight: 600,
        marginTop: 35,
        [theme.breakpoints.down('md')]: {
            marginTop: 10,
            maxHeight: 450,
        },
    },
    video: {
        width: '100%',
        maxHeight: 600,
        backgroundColor: '#000',
        [theme.breakpoints.down('md')]: {
            maxHeight: 450,
        },
    },
    image: {
        width: '100%',
        cursor: 'pointer',
        maxHeight: 600,
        [theme.breakpoints.down('md')]: {
            maxHeight: 450,
        },
    },

    playControl: {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        left: '50%',
        color: '#fff',
        fontSize: 80,
        marginLeft: -40,
        marginTop: -40,
        textShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
    },
    duration: {
        color: '#fff',
        position: 'absolute',
        bottom: 16,
        right: 40
    },
    bottom: {
        [theme.breakpoints.down('md')]: {
            paddingLeft: 8,
            marginTop: 20,
        },
        [theme.breakpoints.up('md')]: {
            padding: 8,
            marginTop: 30,
        },
    },
    moreButton: {
        width: 20,
        height: 24,
        fontSize: 18,
        justifyContent: 'flex-end'
    },
    titleWrap: {
        marginTop: 8,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
           '& >h1':{
               marginTop: 35,
           },
        },
    },
    link: {
        color: '#4a4a4a',
        margin: 8
    },
    date: {
        fontWeight: '900',
        marginRight: 16,
        float: 'left'
    },
    description: {
        float: 'left'
    },
    tagsWrap: {
        clear: 'both',
        paddingTop: 25,
        paddingBottom: 15,
    },
    tag: {
        marginRight: 30,
    },
    uploadUser:{
        fontSize: 14,
        lineHeight: '14px',
        fontWeight: 500,
    },
    share:{
        color: '#4a4a4a',
        opacity: 1,
        margin: 8,
    },

}));


class VideoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            openVideoMenu: false,
            anchorVideoMenuEl: null,
            isDeleteOpen: false

        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.videoId !== this.props.videoId || nextProps.id !== this.props.id)
            this.props.fetchData(nextProps.id, nextProps.videoId);
    }

    goBack = e => {
        e.preventDefault();
        this.props.goBack();
        return false;
    };

    handleShow = event => this.setState({isShow: true}, () => {
        setTimeout(() => {
            const video = document.getElementById(`video-${this.props.video.id}`);
            video.play();
        }, 100);
    });


    handleEdit = event => {
        event.preventDefault();
        this.props.edit(this.props.video.id);
        return false
    };
    handleDialogDelete = event => {
        event.preventDefault();

        this.props.delete(this.props.video.id);
        this.setState({isDeleteOpen: false});
        return false
    };

    handleDelete = event => {
        event.preventDefault();
        this.setState({isDeleteOpen: true});
        return false
    };
    handleDialogCancel = event => {
        this.setState({isDeleteOpen: false})
    };

    handleClick = event => {
        this.setState({openVideoMenu: true, anchorVideoMenuEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({openVideoMenu: false});
    };


    render() {
        const {classes, video, currentUser, user, tagOptions} = this.props;
        if (!video || !user) return null;
        const tags = video.tags ? video.tags.map(v => '' + v) : [];
        return <div className={classes.root}>
            <div className={classes.backgroundImgWrap}>
                <img className={classes.backgroundImg} src={playerBg}/>
            </div>
            <div className={classes.backgroundRight}/>
            <div className={classes.backgroundLeft}/>
            <div className={classes.content}>

                <div className={classes.topNavigate}>
                    <Link to={`/profile/${video.id_user}`} invert disabledUnderline className={classes.backLink}>
                        <ScoutZooIcon>previous</ScoutZooIcon>
                        <Hidden only={['xs', 'sm']}>
                            <span className={classes.backTitle}>Back to profile</span>
                        </Hidden>
                    </Link>
                </div>


                <Paper className={classes.videoWrap}>
                    {this.state.isShow ? (
                        <video src={video.overlay_video_path || video.trim_video_file_path || video.video_path}
                               id={`video-${video.id}`}
                               className={classes.video}
                               controls
                               controlsList="nodownload"/>
                    ) : [
                        <img key="overlay" src={video.overlay || video.thumb_lg} onClick={this.handleShow}
                             className={classes.image}/>,
                        <Icon key="playControl" className={classes.playControl}
                              onClick={this.handleShow}>play_arrow</Icon>,
                        <Typography key="duration" type="caption"
                                    className={classes.duration}>{getTime(video.time_start, video.time_end)}</Typography>
                    ]}

                </Paper>
                <div className={classes.bottom}>
                    <div className={classes.titleWrap}>
                        <Typography type="headline">
                            {video.title}
                        </Typography>
                        {currentUser && currentUser.id === video.id_user && (
                            <div>

                                <Hidden only={['xs', 'sm']}>
                                    <div>
                                        <ShareButton url={absUrl(`/profile/${user.id}/video/${video.id}`)}
                                                     title={`Watch ${user.first_name} ${user.last_name}'s Scout Zoo upload: ${video.title}`}
                                                     dialogTitle={'Share video'}
                                                     style={classes.share}>
                                            <ScoutZooIcon>share</ScoutZooIcon>
                                        </ShareButton>
                                        <Link to={`/video/edit/${video.id}`} disabledUnderline className={classes.link}
                                              onClick={this.handleEdit}>
                                            <ScoutZooIcon>pencil</ScoutZooIcon>
                                        </Link>
                                        <Link to={`/`} disabledUnderline className={classes.link}
                                              onClick={this.handleDelete}>
                                            <ScoutZooIcon>remove</ScoutZooIcon>
                                        </Link>
                                    </div>
                                </Hidden>
                                <Hidden only={['md', 'lg', 'xl']}>
                                    <div>
                                        <ShareButton url={absUrl(`/profile/${user.id}/video/${video.id}`)}
                                                     title={`Watch ${user.first_name} ${user.last_name}'s Scout Zoo upload: ${video.title}`}
                                                     style={classes.share}>
                                            <ScoutZooIcon>share</ScoutZooIcon>
                                        </ShareButton>
                                        <IconButton
                                            className={classes.moreButton}
                                            aria-label="More"
                                            aria-owns={this.state.openVideoMenu ? `video-menu-${video.id}` : null}
                                            aria-haspopup="true"
                                            onClick={this.handleClick}>
                                            <ScoutZooIcon>dots-three-vertical</ScoutZooIcon>
                                        </IconButton>
                                        <Menu id={`video-menu-${video.id}`}
                                              anchorEl={this.state.anchorVideoMenuEl}
                                              open={this.state.openVideoMenu}
                                              onRequestClose={this.handleRequestClose}>
                                            <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                                            <MenuItem onClick={this.handleDelete}>Delete</MenuItem>

                                        </Menu>
                                    </div>
                                </Hidden>

                            </div>
                        )}
                    </div>
                    <div>
                        {video.date && (
                            <Typography type="body1" className={classes.date}>
                                {moment(video.date, '').format('YYYY')}
                            </Typography>
                        )}
                        {video.description && (
                            <Typography type="body1" className={classes.description}>
                                {video.description}
                            </Typography>
                        )}
                    </div>
                    <div className={classes.tagsWrap}>
                        {tagOptions && video.tags && video.tags.length > 0 && (
                            <Typography type="caption">
                                {tagOptions.filter(item => tags.indexOf(item.value) > -1).map(item => item.label).join(' | ')}
                            </Typography>
                        )}
                    </div>
                    <div>
                        <Typography type="caption">
                            Uploaded by <Link to={`/profile/${user.id}`} className={classes.uploadUser}>{user.first_name} {user.last_name}</Link>
                        </Typography>
                    </div>
                </div>
                {currentUser && currentUser.id === video.id_user && (
                    <Dialog
                        open={this.state.isDeleteOpen}
                        ignoreBackdropClick
                        ignoreEscapeKeyUp>
                        <DialogTitle disableTypography>
                            <Typography type="subheading">
                                Do you want to delete the video "{video.title}"?
                            </Typography>
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleDialogCancel}>
                                Cancel
                            </Button>
                            <Button onClick={this.handleDialogDelete} color="primary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}

            </div>

        </div>

    }
};

VideoItem.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet))(VideoItem);