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

import Video from '../../containers/Video';


const sortTags = tagCounts => (a, b) => tagCounts[b] - tagCounts[a];

const sortVideoTags = (a, b) => b.tagCount - a.tagCount;

const styleSheet = createStyleSheet('VideoList', theme => ({
    root: {
        maxWidth: 1168,
        width: '100%',
        margin: '76px auto',
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
            margin: 0,
        },

    },
    button: {
        marginRight: 16,
        marginBottom: 16,
        border: 'solid 1px #cbcbcb',
        color: '#9b9b9b',
        fontFamily: "UnitedSansReg-Medium",
        fontSize: 18,
        fontWeight: '500',
        '&:hover': {
            color: '#9b9b9b',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
            height: 32
        },
    },
    buttonActive: {
        border: 'solid 1px #c2a24d',
        color: '#c2a24d',
        '&:hover': {
            color: '#c2a24d',
        }
    },
    tags: {
        marginBottom: 32
    },
    videoGrid: {
        [theme.breakpoints.down('sm')]: {
            boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.15)',
            marginBottom: 8
        },
    }

}));


class VideoList extends Component {

    state = {
        tags: []
    };

    componentDidMount() {
        if (!this.props.tags.length)
            this.props.fetchData();
    }

    toggleTag = id => e => {

        if (this.state.tags.indexOf(id) < 0)
            return this.setState({tags: [...this.state.tags, id]});

        this.setState({tags: this.state.tags.filter(v => v !== id)});
    };

    render() {
        const {classes, videos, className, tagCounts} = this.props;

        const tags = Object.keys(tagCounts)
            .filter(id => tagCounts[id] > 0)
            .sort(sortTags(tagCounts))
            .map(id => ({
                id,
                title: this.props.tags[id],
                count: tagCounts[id]
            }));

        const sortVideo = videos.map(v => ({
            ...v,
            tagCount: v.video_tags.reduce((a, c) => a + (this.state.tags.indexOf('' + c.id) > -1 ? 1 : 0), 0)
        })).filter(v => this.state.tags.length === 0 || v.tagCount > 0).sort(sortVideoTags);


        return <div className={className}>
            {tags.length > 0 && (
                <div className={classes.tags}>
                    {tags.map(tag => (<Button key={tag.id}
                                              onClick={this.toggleTag(tag.id)}
                                              className={classNames(classes.button, {[classes.buttonActive]: this.state.tags.indexOf(tag.id) > -1})}>
                        {`${tag.title} (${tag.count})`}
                    </Button>))}
                </div>
            )}
            <Grid container gutter={40}>
                {sortVideo.map(item => (
                    <Grid key={item.id} item xs={12} sm={6} className={classes.videoGrid}>
                        <Video video={item}/>
                    </Grid>
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