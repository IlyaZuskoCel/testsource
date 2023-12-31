/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Prompt} from 'react-router';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import Helmet from 'react-helmet';

import * as VIDEO_STATUS from '../../constants/video';

import Upload from './Upload';
import Trim from './Trim';
import Form from './Form';
import Spotlight from './Spotlight';
import PlayerCard from './PlayerCard';

const styleSheet = createStyleSheet('Add', theme => ({
    root: {
        maxWidth: 1168,
        width: '100%',
        margin: '76px auto',
        [theme.breakpoints.down('md')]: {
            marginTop: 80,
        },

    },
    paper: {

        [theme.breakpoints.up('md')]: {
            padding: 32,
        },
        [theme.breakpoints.down('md')]: {
            boxShadow: 'none'
        },
    },
    tabs: {

        margin: '0 auto',
        marginBottom: 36,


        [theme.breakpoints.up('md')]: {
            borderBottom: 'solid 1px #cbcbcb60',
            maxWidth: 430,
        },

        [theme.breakpoints.down('md')]: {
            height: 48,
            zIndex: 500,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            paddingTop: 60,
            paddingLeft: 30,
            paddingRight: 20,
            backgroundImage: 'linear-gradient(287deg, #f55e58, #c9011b)'
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 4,
            paddingRight: 0,

        },


    },
    tabWrap: {
        minWidth: 80,
        height: 72,
        [theme.breakpoints.down('md')]: {
            height: 48,
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 60,
        }
    },
    activeTabWrap: {
        opacity: 1
    },
    tab: {
        color: '#9b9b9b',
        marginTop: -38,
        [theme.breakpoints.down('md')]: {
            marginTop: -30,
            color: '#ffffff',
            opacity: 0.6
        }
    },
    activeTab: {
        color: '#d7001e',
        [theme.breakpoints.down('md')]: {
            color: '#ffffff',
            opacity: 1
        }
    },
    tabNum: {
        opacity: 0.1
    }

}));


class Add extends Component {
    state = {
        tab: 0,
        nextTrim: false,
        isUpdate: true,
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.nextTrim && nextProps.video.status === VIDEO_STATUS.STATUS_TRIMMED) {
            this.setState({nextTrim: false}, () => {
                this.changeTab(2);
            })
        }
        if (nextProps.id !== this.props.id)
            this.props.fetchData(nextProps.id);
    }


    changeTab = tab => {
        if (tab > 0 && !this.props.video.video_path) return;
        if (tab > 1 && !this.props.video.time_end) return;
        if (tab > 1 && this.props.video.time_end - this.props.video.time_start > 60000) return;
        // if (tab > 2 && !this.props.video.overlay_x) return;
        window.scrollTo(0, 0);
        this.setState({tab})
    };

    handleChangeTab = (event, tab) => {
        this.changeTab(tab);
    };
    handleNext = () => this.changeTab(this.state.tab + 1);
    handlePrev = () => this.changeTab(this.state.tab - 1);

    handleTrim = (time_start, time_end) => {
        if (!time_end) return;
        if (time_end - time_start > 60000) return;

        if (time_start === this.props.video.time_start && time_end === this.props.video.time_end)
            return this.handleNext();

        this.setState({nextTrim: true}, () => {
            this.props.trim(this.props.video.id, time_start, time_end);
        });
    };
    handleSubmit = () => {
        this.setState({isUpdate: false}, () => {
            this.props.update(this.props.video);
        });

    };

    render() {
        const {classes, video, user} = this.props;


        return <div className={classes.root}>
            <Helmet>
                <title>{`Add video by ${user.first_name} ${user.last_name}`}</title>
            </Helmet>
            <Prompt
                message="Your video hasn't been uploaded yet! All changes will be lost. Are you sure you want to leave?"
                when={(!!this.props.video.id || 'progress' in this.props.video) && this.state.isUpdate}
            />
            <Hidden only={['md', 'lg', 'xl']}>
                <Tabs index={this.state.tab}
                      centered
                      className={classes.tabs}
                      indicatorColor="white"
                      onChange={this.handleChangeTab}>

                    <Tab className={classNames(classes.tabWrap, {[classes.activeTabWrap]: this.state.tab >= 0})}
                         label={
                             <div>
                                 <Typography className={classes.tabNum} type="headline" align="center">
                                     1
                                 </Typography>
                                 <Typography
                                     className={classNames(classes.tab, {[classes.activeTab]: this.state.tab >= 0})}
                                     type="body2">
                                     Upload

                                 </Typography>
                             </div>

                         }/>
                    <Tab className={classNames(classes.tabWrap, {[classes.activeTabWrap]: this.state.tab >= 1})}
                         label={
                             <div>
                                 <Typography className={classes.tabNum} type="headline" align="center">
                                     2
                                 </Typography>
                                 <Typography
                                     className={classNames(classes.tab, {[classes.activeTab]: this.state.tab >= 1})}
                                     type="body2">
                                     Trim

                                 </Typography>
                             </div>

                         }/>
                    <Tab className={classNames(classes.tabWrap, {[classes.activeTabWrap]: this.state.tab >= 2})}
                         label={
                             <div>
                                 <Typography className={classes.tabNum} type="headline" align="center">
                                     3
                                 </Typography>
                                 <Typography
                                     className={classNames(classes.tab, {[classes.activeTab]: this.state.tab >= 2})}
                                     type="body2">
                                     Spotlight
                                 </Typography>
                             </div>

                         }/>

                    <Tab className={classNames(classes.tabWrap, {[classes.activeTabWrap]: this.state.tab >= 3})}
                         label={
                             <div>
                                 <Typography className={classes.tabNum} type="headline"
                                             align="center">
                                     4
                                 </Typography>
                                 <Typography
                                     className={classNames(classes.tab, {[classes.activeTab]: this.state.tab >= 3})}
                                     type="body2">
                                     Player Card
                                 </Typography>
                             </div>

                         }/>

                    <Tab className={classNames(classes.tabWrap, {[classes.activeTabWrap]: this.state.tab >= 4})}
                         label={
                             <div>
                                 <Typography className={classes.tabNum} type="headline"
                                             align="center">
                                     5
                                 </Typography>
                                 <Typography
                                     className={classNames(classes.tab, {[classes.activeTab]: this.state.tab >= 4})}
                                     type="body2">
                                     Post
                                 </Typography>
                             </div>

                         }/>

                </Tabs>

            </Hidden>

            <Grid container>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>

                        <Hidden only={['xs', 'sm']}>
                            <Tabs index={this.state.tab}
                                  centered
                                  className={classes.tabs}
                                  onChange={this.handleChangeTab}>
                                <Tab className={classes.tabWrap}
                                     label={
                                         <div>
                                             <Typography className={classes.tabNum} type="headline" align="center">
                                                 1
                                             </Typography>
                                             <Typography
                                                 className={classNames(classes.tab, {[classes.activeTab]: this.state.tab >= 0})}
                                                 type="body2">
                                                 Upload

                                             </Typography>
                                         </div>

                                     }/>
                                <Tab className={classes.tabWrap}
                                     label={
                                         <div>
                                             <Typography className={classes.tabNum} type="headline" align="center">
                                                 2
                                             </Typography>
                                             <Typography
                                                 className={classNames(classes.tab, {[classes.activeTab]: this.state.tab >= 1})}
                                                 type="body2">
                                                 Trim

                                             </Typography>
                                         </div>

                                     }/>
                                <Tab className={classes.tabWrap}
                                     label={
                                         <div>
                                             <Typography className={classes.tabNum} type="headline" align="center">
                                                 3
                                             </Typography>
                                             <Typography
                                                 className={classNames(classes.tab, {[classes.activeTab]: this.state.tab >= 2})}
                                                 type="body2">
                                                 Spotlight
                                             </Typography>
                                         </div>

                                     }/>
                                <Tab className={classes.tabWrap}
                                     label={
                                         <div>
                                             <Typography className={classes.tabNum} type="headline" align="center">
                                                 4
                                             </Typography>
                                             <Typography
                                                 className={classNames(classes.tab, {[classes.activeTab]: this.state.tab >= 3})}
                                                 type="body2">
                                                 Player Card
                                             </Typography>
                                         </div>

                                     }/>


                            </Tabs>
                        </Hidden>

                        {this.state.tab === 0 && <Upload video={video}
                                                         onNext={this.handleNext}
                                                         upload={this.props.upload}/>}
                        {this.state.tab === 1 && <Trim video={video}
                                                       onNext={this.handleTrim}
                                                       updateField={this.props.updateField}
                                                       onPrev={this.handlePrev}/>}

                        {this.state.tab === 2 && <Spotlight video={video}
                                                            updateField={this.props.updateField}
                                                            onPrev={this.handlePrev}
                                                            onNext={this.handleNext}/>}

                        {this.state.tab === 3 && <PlayerCard video={video}
                                                       onNext={this.handleNext}
                                                       updateField={this.props.updateField}
                                                       onPrev={this.handlePrev}
                                                       user={this.props.user}/>}

                        {this.state.tab === 4 && <Form video={video}
                                                       tags={this.props.tags}
                                                       updateField={this.props.updateField}
                                                       tagOptions={this.props.tagOptions}
                                                       onSubmit={this.handleSubmit}
                                                       onPrev={this.handlePrev}/>}


                    </Paper>
                </Grid>
                <Grid item md={6} hidden={{smDown: true}}>
                    <Form video={video}
                          hideButton={this.state.tab < 3}
                          tags={this.props.tags}
                          updateField={this.props.updateField}
                          tagOptions={this.props.tagOptions}
                          onSubmit={this.handleSubmit}
                          onPrev={this.handlePrev}/>
                </Grid>
            </Grid>
        </div>;
    }
}

Add.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Add);