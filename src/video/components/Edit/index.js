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
import Hidden from 'material-ui/Hidden';


import * as VIDEO_STATUS from '../../constants/video';

import Trim from './Trim';
import Form from './Form';
import Spotlight from './Spotlight';

const styleSheet = createStyleSheet('Edit', theme => ({
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
            maxWidth: 320,
        },

        [theme.breakpoints.down('md')]: {
            height: 48,
            zIndex: 500,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            paddingTop: 60,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundImage: 'linear-gradient(287deg, #f55e58, #c9011b)'
        },


    },
    tabWrap: {
        minWidth: 80,
        height: 72,
        [theme.breakpoints.down('md')]: {
            height: 48,
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


class Edit extends Component {
    state = {
        tab: 0,
        nextTrim: false,
    };

    componentDidMount() {
        this.props.fetchData(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.nextTrim && nextProps.video.status === VIDEO_STATUS.STATUS_TRIMMED) {
            this.setState({nextTrim: false}, () => {
                this.changeTab(1);
            })
        }
    }

    changeTab = tab => {
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
        this.props.update(this.props.video);
    };

    render() {
        const {classes, video} = this.props;

        if (!video) return null;

        return <div className={classes.root}>

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
                                     Trim

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
                                     Spotlight
                                 </Typography>
                             </div>

                         }/>

                    <Tab className={classNames(classes.tabWrap, {[classes.activeTabWrap]: this.state.tab >= 2})}
                         label={
                             <div>
                                 <Typography className={classes.tabNum} type="headline"
                                             align="center">
                                     3
                                 </Typography>
                                 <Typography
                                     className={classNames(classes.tab, {[classes.activeTab]: this.state.tab >= 2})}
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
                                                 Trim

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
                                                 Spotlight
                                             </Typography>
                                         </div>

                                     }/>

                            </Tabs>
                        </Hidden>

                        {this.state.tab === 0 && <Trim video={video}
                                                       onNext={this.handleTrim}
                                                       updateField={this.props.updateField}
                                                       onPrev={this.handlePrev}/>}
                        {this.state.tab === 1 && <Spotlight video={video}
                                                            updateField={this.props.updateField}
                                                            onPrev={this.handlePrev}
                                                            onNext={this.handleNext}/>}

                        {this.state.tab === 2 && <Form video={video}
                                                       tags={this.props.tags}
                                                       updateField={this.props.updateField}
                                                       tagOptions={this.props.tagOptions}
                                                       onSubmit={this.handleSubmit}
                                                       onPrev={this.handlePrev}/>}


                    </Paper>
                </Grid>
                <Grid item md={6} hidden={{smDown: true}}>
                    <Form video={video}
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

Edit.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Edit);