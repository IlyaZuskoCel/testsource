/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';


import {RangeSlider} from '../../../common/components';


const tipFormatter = value => {

    if (value === 0) return '0:00';

    const duration = moment.duration(value);
    let time = '';
    if (duration.get('hours'))
        time += ('' + duration.get('hours')).slice(-2) + ':';

    time += ('' + duration.get('minutes')).slice(-2) + ':';
    time += ('00' + duration.get('seconds')).slice(-2);

    return time;
};

const styleSheet = createStyleSheet('Trim', theme => ({
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


class Trim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 0,
            max: props.video.duration || null,
            time_start: props.video.time_start || 0,
            time_end: props.video.time_end || 0,
            showRange: false,
        };
    }

    componentDidMount(){
        setInterval(() => this.setState({showRange: true}),2000)
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.video.duration && this.state.max !== nextProps.video.duration)
            || (nextProps.video.time_start && this.state.time_start !== nextProps.video.time_start)
            || (nextProps.video.time_end && this.state.time_end !== nextProps.video.time_end))
            this.setState({
                max: nextProps.video.duration,
                time_start: nextProps.video.time_start,
                time_end: nextProps.video.time_end
            })
    }

    handleChange = range => {
        const video = document.getElementById("video");
        video.currentTime = range[0] / 1000;
        this.setState({
            time_start: range[0],
            time_end: range[1]
        });
    };

    handleTimeUpdate = () => {
        const video = document.getElementById("video");
        if (video.currentTime >= this.state.time_end / 1000)
            video.pause();
    };
    handleNext = () => {
        this.props.onNext(this.state.time_start, this.state.time_end);

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


            <Paper className={classNames(classes.uploadWrap, classes.videoWrap)}>
                <video src={video.video_path}
                       id="video"
                       className={classes.video}
                       onTimeUpdate={this.handleTimeUpdate}
                       onCanPlay={() => this.setState({showRange: true})}
                       controls
                       controlsList="nodownload"/>
            </Paper>

            {this.state.showRange === true && !!video && !!this.state.max && "time_start" in video && "time_end" in video && video.time_start < video.time_end && (
                <div className={classes.range}>
                    <RangeSlider min={this.state.min}
                                 max={this.state.max}
                                 onAfterChange={this.handleChange}
                                 tipFormatter={tipFormatter}
                                 trackStyle={[{backgroundColor: '#d7001e'}]}
                                 defaultValue={[video.time_start || 0, video.time_end || 0]}/>
                </div>
            )}

            <div className={classes.buttons}>
                <Button onClick={this.handleNext} raised
                        color={this.state.time_end - this.state.time_start > 60000 ? 'default' : 'primary'}
                        disabled={this.state.time_end - this.state.time_start > 60000}>
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