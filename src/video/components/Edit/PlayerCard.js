/**
 * Created by Vitaly on 04/21/2017.
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
import Hidden from 'material-ui/Hidden';
import {Link} from '../../../common/components';
import Switch from 'material-ui/Switch';

import {RangeSlider} from '../../../common/components';

const styleSheet = createStyleSheet('PlayerCard', theme => ({
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
        marginBottom: 7,
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
    },
    editProfileLink: {
        fontSize: 18,
        fontWeight: 500
    },
    enablePlayerCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        [theme.breakpoints.down('md')]: {
            marginLeft: 20,
            justifyContent: 'center',
            alignItems: 'center',
        }
    },

}));


class PlayerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {classes, video} = this.props;

        return <div className={classes.root}>
            <Typography className={classes.title} type="subheading" align="center">
                Customize your player card
            </Typography>
            <Typography className={classes.desc} type="body1">
                The player card and bio is taken from your profile. It will appear before your uploaded video as shown below. In order to update the information shown, please {' '}
                <Link to="/profile/edit" disabledUnderline>
                    <span className={classes.editProfileLink}>edit your profile.</span>
                </Link>
            </Typography>


            <Paper className={classNames(classes.uploadWrap, classes.videoWrap)}>
                <video src={video.video_path}
                       id="video"
                       className={classes.video}
                       controls
                       controlsList="nodownload"/>
            </Paper>
            <div className={classes.enablePlayerCard}>
                <Typography type="caption">Enable your player card to appear on video playback.</Typography>
                <Switch/>
            </div>

            <div className={classes.buttons}>
                <Button onClick={this.props.onPrev} raised>
                    Previous
                </Button>

                <Hidden only={['md', 'lg', 'xl']}>
                    <Button onClick={this.props.onNext} raised
                            color={this.state.time_end - this.state.time_start > 60000 ? 'default' : 'primary'}
                            disabled={this.state.time_end - this.state.time_start > 60000}>
                        Next
                    </Button>
                </Hidden>

            </div>
        </div>;
    }
}

PlayerCard.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PlayerCard);