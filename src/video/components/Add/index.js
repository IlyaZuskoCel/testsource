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
            marginTop: 0,
        },

    },
    paper: {
        padding: 32
    },
    tabs: {
        borderBottom: 'solid 1px #cbcbcb60',
        marginBottom: 36,
        marginRight: 36,
        marginLeft: 36,
    },
    tabWrap: {
        height: 72
    },
    tab: {
        color: '#9b9b9b',
        marginTop: -38
    },
    activeTab: {
        color: '#d7001e'
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

    handleChangeTab = (event, tab) => {

        if (tab > 0 && !this.props.video.video_path) return;

        this.setState({tab})
    };
    handleNext = () => this.setState({tab: this.state.tab + 1});
    handlePrev = () => this.setState({tab: this.state.tab - 1});
    handleSubmit = () => {
        this.props.update(this.props.video);
    };

    render() {
        const {classes, video} = this.props;
        return <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>

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


                    </Paper>
                </Grid>
                <Grid item sm={6} hidden={{xsDown: true}}>
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

Add.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Add);