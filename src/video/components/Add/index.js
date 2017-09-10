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

import Upload from './Upload';
import Trim from './Trim';
import Form from './Form';
import Spotlight from './Spotlight';

const styleSheet = createStyleSheet('Add', theme => ({
    root: {
        maxWidth: 1168,
        width: '100%',
        margin: '76px auto',
        [theme.breakpoints.down('sm')]: {
            marginTop: 80,
        },

    },
    paper: {

        [theme.breakpoints.up('sm')]: {
            padding: 32,
        },
        [theme.breakpoints.down('sm')]: {
            boxShadow: 'none'
        },
    },
    tabs: {

        margin: '0 auto',
        marginBottom: 36,


        [theme.breakpoints.up('sm')]: {
            borderBottom: 'solid 1px #cbcbcb60',
            maxWidth: 320,
        },

        [theme.breakpoints.down('sm')]: {
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
        [theme.breakpoints.down('sm')]: {
            height: 48,
        }
    },
    activeTabWrap: {
        opacity: 1
    },
    tab: {
        color: '#9b9b9b',
        marginTop: -38,
        [theme.breakpoints.down('sm')]: {
            marginTop: -30,
            color: '#ffffff',
            opacity: 0.6
        }
    },
    activeTab: {
        color: '#d7001e',
        [theme.breakpoints.down('sm')]: {
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
        tab: 0
    };

    componentDidMount() {
        this.props.fetchData();
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


    handleSubmit = () => {
        this.props.update(this.props.video);
    };

    render() {
        const {classes, video} = this.props;


        return <div className={classes.root}>

            <Hidden smUp>
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
                                     Post
                                 </Typography>
                             </div>

                         }/>

                </Tabs>

            </Hidden>

            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>

                        <Hidden xsDown>
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

                            </Tabs>
                        </Hidden>

                        {this.state.tab === 0 && <Upload video={video}
                                                         onNext={this.handleNext}
                                                         upload={this.props.upload}/>}
                        {this.state.tab === 1 && <Trim video={video}
                                                       onNext={this.handleNext}
                                                       updateField={this.props.updateField}
                                                       onPrev={this.handlePrev}/>}

                        {this.state.tab === 2 && <Spotlight video={video}
                                                            updateField={this.props.updateField}
                                                            onPrev={this.handlePrev}
                                                            onNext={this.handleNext}/>}

                        {this.state.tab === 3 && <Form video={video}
                                                       tags={this.props.tags}
                                                       updateField={this.props.updateField}
                                                       tagOptions={this.props.tagOptions}
                                                       onSubmit={this.handleSubmit}
                                                       onPrev={this.handlePrev}/>}


                    </Paper>
                </Grid>
                <Grid item sm={6} hidden={{xsDown: true}}>
                    <Form video={video}
                          hideButton={this.state.tab < 2}
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