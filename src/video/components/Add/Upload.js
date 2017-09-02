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

const styleSheet = createStyleSheet('Upload', theme => ({
    root: {},
    title: {},
    desc: {
        marginTop: 32,
        marginBottom: 32,

    },
    uploadWrap: {
        boxShadow: 'none',
        margin: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    uploadInputWrap: {
        position: 'relative'
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

    onUploadPicture = event => {
        event.preventDefault();
        if (!event.target.files.length) return;

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


            <Paper className={classes.uploadWrap}>
                {!video.video_path && (
                    <div className={classes.uploadInputWrap}>
                        <Button raised color="primary">
                            Choose a video to upload
                        </Button>
                        <input autoComplete="off" type="file"
                               accept="video/*"
                               onChange={this.onUploadPicture}
                               className={classes.uploadInput}/>
                    </div>

                )}
                {video.video_path && (
                    <video src={video.video_path} className={classes.video} controls/>
                )}

            </Paper>


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