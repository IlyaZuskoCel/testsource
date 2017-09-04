/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import {LinearProgress} from 'material-ui/Progress';
import Icon from 'material-ui/Icon';


const styleSheet = createStyleSheet('Upload', theme => ({
    root: {},
    title: {},
    desc: {
        marginTop: 32,
        marginBottom: 32,

    },
    uploadWrap: {
        margin: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    uploadInputWrap: {
        position: 'relative',
        marginBottom: 32
    },
    uploadIcon: {
        fontSize: 72,
        color: '#e2e2e2',
        margin: 32
    },
    progress: {
        color: '#e2e2e2',
        margin: 32
    },
    linearProgress: {

        width: '80%',
        height: 40
    },
    progressTitle: {
        marginTop: -40,
        lineHeight: '40px',
        marginBottom: 32,
        textTransform: 'uppercase',
        color: '#fff',
        zIndex: 1000
    },
    uploadInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0,
        cursor: 'pointer',
    },
    buttons: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    video: {
        width: '100%'
    }
}));


class Upload extends Component {
    state = {error: ''};
    onUploadVideo = event => {
        event.preventDefault();

        if (!event.target.files.length) return;

        if (event.target.files[0].size > 31457280)
            return this.setState({error: 'Please upload another video - the file size should be under 30 MB'});

        this.setState({error: ''});
        this.props.upload(event.target.files[0]);

    };

    render() {
        const {classes, video} = this.props;
        return <div className={classes.root}>
            <Typography className={classes.title} type="subheading" align="center">
                Show the scouts what you’re made of
            </Typography>
            <Typography className={classes.desc} type="body1">
                Upload a clip from your game or practice, then we’ll help you trim it down to 1 minute or less of pure
                skill.<br/>
                Make sure your video is filmed from above, is in landscape mode, and is in high quality.
            </Typography>


            {!video.video_path && !video.progress && (  <Paper className={classes.uploadWrap}>
                    <Icon className={classes.uploadIcon}>file_upload</Icon>
                    <div className={classes.uploadInputWrap}>
                        <Button raised color="primary">
                            Choose a video to upload
                        </Button>
                        <input autoComplete="off" type="file"
                               accept="video/*"
                               onChange={this.onUploadVideo}
                               className={classes.uploadInput}/>
                    </div>
                </Paper>
            )}

            {!video.video_path && video.progress && ( <Paper className={classes.uploadWrap}>
                {video.progress < 100 ? (
                    <Typography type="headline"
                                className={classes.progress}>{video.progress}%</Typography>
                ) : (
                    <Icon className={classes.uploadIcon}>movie</Icon>
                )}

                <LinearProgress color="accent" mode="determinate" value={video.progress}
                                className={classes.linearProgress}/>
                <Typography type="body1"
                            className={classes.progressTitle}>{video.progress < 100 ? 'Upload in progress' : 'Convert in progress'}</Typography>
            </Paper>)}

            {video.video_path && (<Paper className={classes.uploadWrap}>
                    <video src={video.video_path} className={classes.video} controls/>
                </Paper>
            )}
            {this.state.error && <Typography type="body2">{this.state.error}</Typography>}

            <div className={classes.buttons}>
                <Button onClick={this.props.onNext} raised color={video.video_path ? 'primary' : 'default'}
                        disabled={!video.video_path}>
                    Next
                </Button>
            </div>
        </div>;
    }
}

Upload.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Upload);