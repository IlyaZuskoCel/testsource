/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import moment from 'moment';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Hidden from 'material-ui/Hidden';
import Menu, {MenuItem} from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {Link, Icon as ScoutZooIcon} from '../../../common/components'
import {absUrl} from "../../../common/helpers";

import ShareButton from '../../../user/components/ShareButton';


const getTime = (start, end) => {
    const value = end - start;

    if (value === 0) return '0:00';

    const duration = moment.duration(value);
    let time = '';

    time += ('0' + duration.get('minutes')).slice(-1) + ':';

    time += ('00' + duration.get('seconds')).slice(-2);

    return time;
};

const styleSheet = createStyleSheet('Video', theme => ({
    root: {},
    videoWrap: {
        position: 'relative',
        width: '100%',
        backgroundColor: '#000',
        textAlign: 'center',
        maxHeight: 264,
    },
    video: {
        width: '100%',
        maxHeight: 264,
        backgroundColor: '#000',
    },
    image: {
        maxWidth: '100%',
        cursor: 'pointer',
        maxHeight: 264,
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
        },
        [theme.breakpoints.up('md')]: {
            padding: 8,
        },
    },
    moreButton: {
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
    tags: {
        clear: 'both',
        paddingTop: 8
    },
    share:{
        color: '#4a4a4a',
        opacity: 1,
        margin: 8,
    },
    download: {
        color: '#4a4a4a',
        opacity: 1,
        margin: 8,
        cursor: 'pointer',
        display: 'inline-block',
        transform: 'rotate(-90deg)',
        fontSize: 20,
    }
}));


class Video extends Component {
    state = {
        isShow: false,
        openVideoMenu: false,
        anchorVideoMenuEl: null,
        isDeleteOpen: false
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

    handleDownload = () => {
        this.props.downloadVideo(this.props.video);
    };

    handleSharedCount = () => {
        this.props.sharedCount(this.props.video.id, this.props.token);
    };

    render() {
        const {classes, video, currentUser, user} = this.props;
        return (
            <div className={classes.root}>
                <Link to={`/profile/${video.id_user}/video/${video.id}`} disabledUnderline>
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
                </Link>
                <div className={classes.bottom}>
                    <div className={classes.titleWrap}>
                        <Link to={`/profile/${video.id_user}/video/${video.id}`} disabledUnderline>
                            <Typography type="subheading">
                                {video.title}
                            </Typography>
                        </Link>

                        <div>
                            <Hidden only={['xs', 'sm']}>
                                <div>
                                    <ShareButton url={absUrl(`/profile/${user.id}/video/${video.id}`)}
                                                 title={`Watch ${user.first_name} ${user.last_name}'s Scout Zoo upload: ${video.title}`}
                                                 dialogTitle={'Share video'}
                                                 style={classes.share}
                                                 sharedCount={this.handleSharedCount}>
                                        <ScoutZooIcon>share</ScoutZooIcon>
                                    </ShareButton>
                                    <div className={classes.download} onClick={this.handleDownload}>
                                        <ScoutZooIcon>left</ScoutZooIcon>
                                    </div>
                                    {currentUser && currentUser.id === video.id_user &&
                                    <Link to={`/video/edit/${video.id}`} disabledUnderline className={classes.link}
                                          onClick={this.handleEdit}>
                                        <ScoutZooIcon>pencil</ScoutZooIcon>
                                    </Link>}
                                    {currentUser && currentUser.id === video.id_user &&
                                    <Link to={`/`} disabledUnderline className={classes.link}
                                          onClick={this.handleDelete}>
                                        <ScoutZooIcon>remove</ScoutZooIcon>
                                    </Link>}
                                </div>
                            </Hidden>
                            <Hidden only={['md', 'lg', 'xl']}>
                                <div>
                                    <ShareButton url={absUrl(`/profile/${user.id}/video/${video.id}`)}
                                                 title={`Watch ${user.first_name} ${user.last_name}'s Scout Zoo upload: ${video.title}`}
                                                 dialogTitle={'Share video'}
                                                 style={classes.share}
                                                 sharedCount={this.handleSharedCount}>
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
                                        {currentUser && currentUser.id === video.id_user &&
                                        <MenuItem onClick={this.handleEdit}>Edit</MenuItem>}
                                        {currentUser && currentUser.id === video.id_user &&
                                        <MenuItem onClick={this.handleDelete}>Delete</MenuItem>}
                                        <MenuItem onClick={this.handleDownload}>Download</MenuItem>
                                    </Menu>
                                </div>
                            </Hidden>

                        </div>
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
                    <div className={classes.tags}>
                        {video.video_tags && video.video_tags.length > 0 && (
                            <Typography type="caption">
                                {video.video_tags.map(tag => tag.name).join(' | ')}
                            </Typography>
                        )}
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
            </div>);
    }
}

Video.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Video);