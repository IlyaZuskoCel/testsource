/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Button from 'material-ui/Button';
import FormControl from 'material-ui/Form/FormControl';
import TextField from 'material-ui/TextField';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('Login', theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        marginLeft: -72,
        marginTop: 30,
        width: 400,
        position: 'inherit'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    },
    formControl: {

    },
    button:{
        marginTop: 32
    }
}));


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: [],
            terms:'no',
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
        return <div className={classes.root}>

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

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.terms === 'yes'}
                            onChange={this.handleChange('terms')}
                            value={this.state.terms === 'yes' ? 'no' : 'yes'}
                        />
                    }
                    label="Remember me"
                    style={{marginTop: 24,marginRight:136}}
                />
                <Typography type="body1" style={{marginTop: 24,marginRight:136}}>Forgot password</Typography>
                <FormControl className={classes.formControl}>
                    <Button raised type="submit" color="primary" className={classes.button}>
                        Login
                    </Button>
                </FormControl>

            </form>
        </div>

    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Login);