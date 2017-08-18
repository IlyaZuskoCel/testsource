/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import PlayerForm from './PlayerForm';
import ScoutForm from './PlayerForm';

const styleSheet = createStyleSheet('Register', theme => ({
    root: {
        backgroundColor: '#ffffff',
        marginTop: -32,

        [theme.breakpoints.up('sm')]: {
           marginLeft: -24,
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
        return (<div className={classes.root}>
            {this.state.index === 0 && <PlayerForm onSubmit={this.props.registerPlayer}/>}
            {this.state.index === 1 && <ScoutForm onSubmit={this.props.registerScout}/>}
        </div>);
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Register);