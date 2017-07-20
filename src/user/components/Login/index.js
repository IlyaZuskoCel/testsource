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


const styleSheet = createStyleSheet('Login', theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        left: '50%',
        marginLeft: -200,
        marginTop: 100,
        width: 400
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    formControl: {
        margin: 10
    }
}));


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        return <Paper className={classes.root}>
            <AppBar position="static">
                <Tabs index={0} onChange={() => {
                }}>
                    <Tab label="Sign In"/>
                </Tabs>
            </AppBar>

            <form className={classes.form} onSubmit={this.handleSubmit}>
                <TextField id="username"
                           required
                           error={this.state.errors.indexOf('username') > -1}
                           label="Username/Email"
                           value={this.state.username}
                           onChange={this.handleChange('username')}
                           className={classes.formControl}
                />
                <TextField id="password"
                           type="password"
                           required
                           error={this.state.errors.indexOf('password') > -1}
                           label="Password"
                           value={this.state.password}
                           onChange={this.handleChange('password')}
                           className={classes.formControl}
                />
                <FormControl className={classes.formControl}>
                    <Button raised type="submit" color="primary" className={classes.button}>
                        Login
                    </Button>
                </FormControl>
            </form>
        </Paper>

    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Login);