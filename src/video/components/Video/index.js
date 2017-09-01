/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import moment from 'moment';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';


const styleSheet = createStyleSheet('Video', theme => ({
    root: {},
    videoWrap: {
        position: 'relative',
        width: '100%',
        textAlign: 'center'
    },
    video: {
        height: 264,
        boxShadow: '0 0px 4px 0 rgba(0, 0, 0, 0.3)',
    },
    image: {
        height: 264,
        boxShadow: '0 0px 4px 0 rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
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
        color: '#fff'
    },
    bottom: {
        padding: 8
    },
    titleWrap: {
        marginTop: 8,
        marginBottom: 8,
    },
    date: {
        fontWeight: '900',
        marginRight: 16,
        float: 'left'
    },
    description: {
        float: 'left'
    }
}));


class Video extends Component {
    state = {
        isShow: false
    };
    handleShow = event => this.setState({isShow: true});

    render() {
        const {classes, video} = this.props;
        return <div className={classes.root}>
            <div className={classes.videoWrap}>
                {this.state.isShow ? (
                    <video src={video.video_path}
                           className={classes.video}
                           autoPlay
                           controls/>
                ) : [
                    <img src={video.overlay || video.thumb_lg} onClick={this.handleShow} className={classes.image}/>,
                    <Icon className={classes.playControl} onClick={this.handleShow}>play_arrow</Icon>,
                    <Typography type="caption" className={classes.duration}>{video.duration || '0:54'}</Typography>
                ]}

            </div>
            <div className={classes.bottom}>
                <div className={classNames.titleWrap}>
                    <Typography type="subheading">
                        {video.title}
                    </Typography>
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
                {video.tags && video.tags.length > 0 && (
                    <Typography type="caption">
                        {video.tags.map(i => this.props.tags[i]).join(' | ')}
                    </Typography>
                )}


            </div>
        </div>;
    }
}

Video.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Video);