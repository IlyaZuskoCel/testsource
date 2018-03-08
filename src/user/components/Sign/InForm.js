/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';
import Link from '../../../common/components/Link/index';

const styleSheet = createStyleSheet('InForm', theme => ({
    root: {
        marginTop: 64,
        [theme.breakpoints.down('md')]: {
            marginTop: 0,
        }
    },
    buttons: {
        textAlign: 'center',
        marginTop: 32
    },
    link: {
        color: '#eb3941',
        textDecoration: 'underline'
    }
}));


class InForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false,
            errors: [],

        };
    }

    handleChange = (name) => event => {
        return this.setState({[name]: event.target.value});
    };
    handleChangeCheckbox = (name) => event => {
        return this.setState({[name]: !this.state[name]});
    };
    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.username)
            return this.setState({errors: ['username']});

        if (!this.state.password)
            return this.setState({errors: ['password']});

        // Intercom login
        window.Intercom('boot', { 
            app_id: INTERCOM_ID, 
            email: this.state.username 
        });

        var detail = { email: this.state.username };
        Intercom('trackEvent', 'Log in', detail);

        this.props.logIn(this.state.username, this.state.password);
        return false;
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <form onSubmit={this.handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField required
                                       fullWidth
                                       error={this.state.errors.indexOf('username') > -1}
                                       label="Email Address"
                                       type="email"
                                       value={this.state.username}
                                       onChange={this.handleChange('username')}
                                       helperText="New users must click the verification link in their email inbox before logging in for the first time"/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField type="password"
                                       required
                                       fullWidth
                                       error={this.state.errors.indexOf('password') > -1}
                                       label="Password"
                                       value={this.state.password}
                                       onChange={this.handleChange('password')}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.remember}
                                        onChange={this.handleChangeCheckbox('remember')}
                                        value="remember"
                                    />
                                }
                                label="Remember me"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Link to="/forgot">
                                <Typography type="body1" className={classes.link}>Forgot my password</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={12} className={classes.buttons}>
                            <Button raised type="submit" color="primary">
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

InForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(InForm);