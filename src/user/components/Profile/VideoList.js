/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */

/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import Video from '../../../video/containers/Video';

const styleSheet = createStyleSheet('VideoList', theme => ({
    root: {
        maxWidth: 1168,
        width: '100%',
        margin: '76px auto',
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
        },

    },


}));


class VideoList extends Component {
    render() {
        const {classes, videos, className} = this.props;
        return <div className={className}>

            <Grid container gutter={40}>
                {videos.map(item => (
                    <Grid key={item.id} item xs={12} sm={6}><Video video={item}/></Grid>
                ))}
            </Grid>
        </div>;
    }
}

VideoList.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(VideoList);