/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import {LinearProgress} from 'material-ui/Progress';
import Icon from 'material-ui/Icon';


const styleSheet = createStyleSheet('Upload', theme => ({
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
        marginBottom: 16,
        [theme.breakpoints.up('md')]: {
            margin: 16,
        },

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
    videoWrap: {
        width: '100%',
        backgroundColor: '#000',
        maxHeight: 264,
    },
    video: {
        width: '100%',
        maxHeight: 264,
        backgroundColor: '#000',
    }
}));


class Upload extends Component {
    state = {error: ''};
    onUploadVideo = event => {
        event.preventDefault();

        if (!event.target.files.length) return;

        if (event.target.files[0].size > 2147483648)
            return this.setState({error: 'Please upload another video - the file size should be under 2 GB'});

        if (event.target.files[0].type.search('video') < 0 && event.target.files[0].name.search('webm') < 0  && event.target.files[0].name.search('mp4') < 0)
            return this.setState({error: 'Please upload another video - the file type should be video'});

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


            {!video.video_path && typeof video.progress === 'undefined' && (  <Paper className={classes.uploadWrap}>
                    <Icon className={classes.uploadIcon}>file_upload</Icon>
                    <div className={classes.uploadInputWrap}>
                        <Button raised color="primary">
                            Choose a video to upload
                        </Button>
                        <input autoComplete="off" type="file"
                               onChange={this.onUploadVideo}
                               className={classes.uploadInput}/>
                    </div>
                </Paper>
            )}

            {video.status !== 3 && video.status !== 5 && video.progress >= 0 && ( <Paper className={classes.uploadWrap}>
                {video.progress < 100 ? (
                    <Typography type="headline"
                                className={classes.progress}>{video.progress}%</Typography>
                ) : (
                    <Icon className={classes.uploadIcon}>movie</Icon>
                )}

                <LinearProgress color="accent" mode={video.progress < 100 ? "determinate" : 'indeterminate'}
                                value={video.progress}
                                className={classes.linearProgress}/>
                <Typography type="body1"
                            className={classes.progressTitle}>{video.progress < 100 ? 'Upload in Progress' : 'Conversion in Progress'}</Typography>
            </Paper>)}

            {(video.status === 3 || video.status === 5) && (<Paper className={classNames(classes.uploadWrap, classes.videoWrap)}>
                    <video src={video.video_path} className={classes.video} controls controlsList="nodownload"/>
                </Paper>
            )}
            {this.state.error && <Typography type="body2">{this.state.error}</Typography>}

            <div className={classes.buttons}>
                <Button onClick={this.props.onNext} raised color={(video.status !== 3 && video.status !== 5) ? 'default' : 'primary'}
                        disabled={video.status !== 3 && video.status !== 5}>
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