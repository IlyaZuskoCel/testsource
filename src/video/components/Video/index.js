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
import IconButton from 'material-ui/IconButton';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {Link, Icon as ScoutZooIcon} from '../../../common/components'


const styleSheet = createStyleSheet('Video', theme => ({
    root: {},
    videoWrap: {
        position: 'relative',
        width: '100%',
        textAlign: 'center'
    },
    video: {
        maxWidth: '100%',
        boxShadow: '0 0px 4px 0 rgba(0, 0, 0, 0.3)',
        [theme.breakpoints.up('sm')]: {
            maxHeight: 264,
        },
    },
    image: {
        maxWidth: '100%',

        boxShadow: '0 0px 4px 0 rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',

        [theme.breakpoints.up('sm')]: {
            maxHeight: 264,
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
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 8,
        },
        [theme.breakpoints.up('sm')]: {
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
    }
}));


class Video extends Component {
    state = {
        isShow: false,
        openVideoMenu: false,
        anchorVideoMenuEl: null,
        isDeleteOpen: false
    };
    handleShow = event => this.setState({isShow: true});


    handleEdit = event => {
        event.preventDefault();
        this.toggleVideoMenu(event);

        this.props.edit(this.props.video.id);
        return false
    };
    handleDialogDelete = event => {
        event.preventDefault();
        this.toggleVideoMenu(event);

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

    toggleVideoMenu = event => {

        let state = {openVideoMenu: !this.state.openVideoMenu};
        if (!this.state.openVideoMenu)
            state.anchorVideoMenuEl = event.anchorVideoMenuEl;


        this.setState(state)
    };

    render() {
        const {classes, video, currentUser} = this.props;
        return <div className={classes.root}>
            <div className={classes.videoWrap}>
                {this.state.isShow ? (
                    <video src={video.video_path}
                           className={classes.video}
                           autoPlay
                           controls/>
                ) : [
                    <img key="overlay" src={video.overlay || video.thumb_lg} onClick={this.handleShow}
                         className={classes.image}/>,
                    <Icon key="playControl" className={classes.playControl} onClick={this.handleShow}>play_arrow</Icon>,
                    <Typography key="duration" type="caption"
                                className={classes.duration}>{video.duration || '0:54'}</Typography>
                ]}

            </div>
            <div className={classes.bottom}>
                <div className={classes.titleWrap}>
                    <Typography type="subheading">
                        {video.title}
                    </Typography>
                    {currentUser.id === video.id_user && (
                        <div>

                            <Hidden smDown>
                                <div>
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
                            <Hidden smUp>
                                <div>
                                    <IconButton
                                        className={classes.moreButton}
                                        aria-label="More"
                                        aria-owns={`video-menu-${video.id}`}
                                        aria-haspopup="true"
                                        onClick={this.toggleVideoMenu}>
                                        <ScoutZooIcon>dots-three-vertical</ScoutZooIcon>
                                    </IconButton>
                                    <Menu id={`video-menu-${video.id}`}
                                          anchorEl={this.state.anchorVideoMenuEl}
                                          open={this.state.openVideoMenu}
                                          onRequestClose={this.toggleVideoMenu}>
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
                <div className={classes.tags}>
                    {video.video_tags && video.video_tags.length > 0 && (
                        <Typography type="caption">
                            {video.video_tags.map(tag => tag.name).join(' | ')}
                        </Typography>
                    )}
                </div>

            </div>

            <Dialog
                open={this.state.isDeleteOpen}
                ignoreBackdropClick
                ignoreEscapeKeyUp>
                <DialogTitle disableTypography>
                    <Typography type="subheading">
                        Do you want to delete the video " {video.title}"?
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

        </div>;
    }
}

Video.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Video);