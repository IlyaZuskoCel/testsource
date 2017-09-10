/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';


import {RangeSlider} from '../../../common/components';


const tipFormatter = value => {

    if (value === 0) return '00.000';

    const duration = moment.duration(value);
    let time = '';
    if (duration.get('hours'))
        time += ('00' + duration.get('hours')).slice(-2) + ':';
    if (duration.get('minutes'))
        time += ('00' + duration.get('minutes')).slice(-2) + ':';

    time += ('00' + duration.get('seconds')).slice(-2) + '.';
    time += ('000' + duration.get('milliseconds')).slice(-3);

    return time;
};

const styleSheet = createStyleSheet('Trim', theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 16,
            paddingRight: 16,
        }
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            textAlign: "left"
        }
    },
    desc: {
        marginTop: 32,
        marginBottom: 32,

    },
    uploadWrap: {
        marginBottom: 16,
        [theme.breakpoints.up('sm')]: {
            margin: 16,
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    range: {
        padding: 16,
        position: 'relative'
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


class Trim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 0,
            max: props.video.duration || null
        };
    }

    handleChange = range => {
        const video = document.getElementById("video");
        video.currentTime = range[0] / 1000;
        this.setState({range});

        this.props.updateField('time_start', range[0]);
        this.props.updateField('time_end', range[1]);
    };
    handleLoadedMetadata = () => {
        const video = document.getElementById("video");
        const duration = video.duration;
        const max = Math.ceil(video.duration * 1000);
        if (!this.props.video.time_end)
            this.props.updateField('time_end', max);
        this.setState({min: 0, max, duration})
    };
    handleTimeUpdate = () => {
        const video = document.getElementById("video");
        if (video.currentTime >= this.props.video.time_end / 1000)
            video.pause();
    };

    render() {
        const {classes, video} = this.props;
        return <div className={classes.root}>
            <Typography className={classes.title} type="subheading" align="center">
                Trim your video
            </Typography>
            <Typography className={classes.desc} type="body1">
                Trim your video to 1 minute or less by dragging the circles closer to each other - make sure that you
                can see yourself in the very first frame of the clip so that we can spotlight you next.
            </Typography>


            <Paper className={classes.uploadWrap}>
                <video src={video.video_path}
                       id="video"
                       className={classes.video}
                       onLoadedMetadata={this.handleLoadedMetadata}
                       onTimeUpdate={this.handleTimeUpdate}
                       controls/>
            </Paper>

            {this.state.max && (
                <div className={classes.range}>
                    <RangeSlider min={this.state.min}
                                 max={this.state.max}
                                 onChange={this.handleChange}
                                 onAfterChange={this.handleChange}
                                 tipFormatter={tipFormatter}
                                 trackStyle={[{backgroundColor: '#d7001e'}]}
                                 defaultValue={[video.time_start || 0, video.time_end || 0]}/>
                </div>
            )}


            <div className={classes.buttons}>
                <Button onClick={this.props.onNext} raised
                        color={video.time_end - video.time_start > 60000 ? 'default' : 'primary'}
                        disabled={video.time_end - video.time_start > 60000}>
                    Next
                </Button>
            </div>
        </div>;
    }
}

Trim.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Trim);