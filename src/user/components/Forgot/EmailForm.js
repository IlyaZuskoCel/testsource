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
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('EmailForm', theme => ({
    root: {
        marginTop: 64,
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
        }
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 32
    }
}));


class EmailForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            errors: [],
        };
    }

    handleChange = (name) => event => {
        return this.setState({[name]: event.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.email)
            return this.setState({errors: ['email']});

        this.props.submit(this.state.email);
        return false;
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <Typography type="title">Forgot your password?</Typography>
                <Typography type="body1">Please enter your email and submit. <br/>
                    You will receive an email on how to reset your password.</Typography>
                <form onSubmit={this.handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField required
                                       fullWidth
                                       error={this.state.errors.indexOf('email') > -1}
                                       label="Email Address"
                                       type="email"
                                       value={this.state.email}
                                       onChange={this.handleChange('email')}/>
                        </Grid>

                        <Grid item xs={12} className={classes.buttons}>
                            <Button raised onClick={this.props.cancel}>
                                Cancel
                            </Button>
                            <Button raised type="submit" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

EmailForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(EmailForm);