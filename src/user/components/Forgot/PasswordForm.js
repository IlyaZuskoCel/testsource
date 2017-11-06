/**
 * Created by aleksandr on 9/5/17.
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

const styleSheet = createStyleSheet('PasswordForm', theme => ({
    root: {
        marginTop: 64,
        [theme.breakpoints.down('md')]: {
            marginTop: 0,
        }
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 32
    }

}));


class PasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password_conf: '',
            password: '',
            errors: [],

        };
    }

    handleChange = (name) => event => {
        return this.setState({[name]: event.target.value});
    };
    handleSubmit = e => {
        e.preventDefault();


        if (!this.state.password)
            return this.setState({errors: ['password']});

        if (!this.state.password_conf || this.state.password !== this.state.password_conf)
            return this.setState({errors: ['password_conf']});

        this.props.submit(this.props.token, this.state.password, this.state.password_conf);
        return false;
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <Typography type="title">Change my password</Typography>

                <form onSubmit={this.handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField type="password"
                                       required
                                       fullWidth
                                       error={this.state.errors.indexOf('password') > -1}
                                       label="New Password"
                                       value={this.state.password}
                                       onChange={this.handleChange('password')}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password"
                                       required
                                       fullWidth
                                       error={this.state.errors.indexOf('password_conf') > -1}
                                       label="Re type New Password"
                                       value={this.state.password_conf}
                                       onChange={this.handleChange('password_conf')}/>
                        </Grid>
                        <Grid item xs={12} className={classes.buttons}>
                            <Button raised onClick={this.props.cancel}>
                                Cancel
                            </Button>
                            <Button raised type="submit" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

PasswordForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PasswordForm);