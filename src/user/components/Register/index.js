/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Tabs, {Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import FormControl from 'material-ui/Form/FormControl';
import TextField from 'material-ui/TextField';


import PlayerForm from './PlayerForm';
import ScoutForm from './PlayerForm';

const styleSheet = createStyleSheet('Register', theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        marginTop: 100,
        [theme.breakpoints.up('sm')]: {
            position: 'relative',
            width: 600,
            left: '50%',
            marginLeft: -300,

        },

    },

}));


class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            username: '',
            password: '',
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    handleChangeTab(event, index) {
        this.setState({index});
    }


    handleChange(name) {
        return event => this.setState({[name]: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.username)
            return this.setState({errors: ['username']});

        if (!this.state.password)
            return this.setState({errors: ['password']});

        this.props.logIn(this.state.username, this.state.password);
        return false;
    }

    render() {
        const classes = this.props.classes;
        return <Paper className={classes.root}>
            <AppBar position="static">
                <Tabs index={this.state.index} onChange={this.handleChangeTab}>
                    <Tab label="Register Player"/>
                    <Tab label="Register Scout"/>
                </Tabs>
            </AppBar>
            {this.state.index === 0 && <PlayerForm onSubmit={this.props.registerPlayer}/>}
            {this.state.index === 1 && <ScoutForm onSubmit={this.props.registerScout}/>}
        </Paper>

    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Register);