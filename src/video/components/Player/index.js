import React, {Component} from 'react';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import compose from 'recompose/compose';
import {absUrl} from '../../../common/helpers';

const styleSheet = createStyleSheet('Player', theme => ({
    video: {
        width: "100%",
        maxWidth: "600px",
        height: "auto"
    },
}));


const Player = ({classes, video, user}) => (
    <video src={absUrl(video.overlay_video_path || video.trim_video_file_path || video.video_path)}
           className={classes.video}
           controls
           controlsList="nodownload"/>
)


export default compose(withStyles(styleSheet))(Player);