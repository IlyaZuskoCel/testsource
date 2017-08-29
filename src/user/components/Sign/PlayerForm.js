/**
 * Created by aleksandr on 8/29/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import classNames from 'classnames';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';


import {Link, DateTextField} from '../../../common/components';


const styleSheet = createStyleSheet('PlayerForm', theme => ({
    root: {},
    buttons: {
        textAlign: 'center',
        marginTop: 32
    },
    link: {
        color: '#eb3941',
        textDecoration: 'underline'
    },
    radioAgent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioAgentWrap: {
        marginBottom: 16,
        marginTop: 48
    },
    emailAgentTextField: {
        marginBottom: 16,
    },
    radioAgentLabel: {
        marginRight: 24,
    },
    hasLabel: {
        marginLeft: -12,
        marginRight: 16,
        marginTop: 48
    }
}));


class PlayerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

    }

    handleChange = (name) => event => {
        return this.setState({[name]: event.target.value, errors:[]});
    };
    handleChangeCheckbox = (name) => event => {
        return this.setState({[name]: this.state[name] === '1' ? '0' : '1', errors:[]});
    };
    handleSubmit = e => {
        e.preventDefault();

        if (this.state.password !== this.state.password_repeat)
            return this.setState({errors: ['password_repeat']});

        this.props.register(this.state);
        return false;
    };
    handleRadio = name => (event, value) => {
        return this.setState({[name]: parseInt(value), errors:[]})
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <form onSubmit={this.handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField required
                                       fullWidth
                                       error={this.state.errors.indexOf('first_name') > -1}
                                       label="First Name"
                                       value={this.state.first_name}
                                       onChange={this.handleChange('first_name')}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                       required
                                       error={this.state.errors.indexOf('last_name') > -1}
                                       label="Last Name"
                                       value={this.state.last_name}
                                       onChange={this.handleChange('last_name')}
                                       className={classes.formControl}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DateTextField required
                                           fullWidth
                                           error={this.state.errors.indexOf('birthday') > -1}
                                           label="Date of Birth"
                                           value={this.state.birthday}
                                           onChange={this.handleChange('birthday')}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required
                                       fullWidth
                                       error={this.state.errors.indexOf('email') > -1}
                                       label="Email Address"
                                       value={this.state.email}
                                       onChange={this.handleChange('email')}/>
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
                            <TextField type="password"
                                       required
                                       fullWidth
                                       error={this.state.errors.indexOf('password_repeat') > -1}
                                       label="Re-type Password"
                                       value={this.state.password_repeat}
                                       onChange={this.handleChange('password_repeat')}/>
                        </Grid>

                        <Grid item xs={12}>
                            <div className={classNames(classes.radioAgentWrap, classes.radioAgent)}>
                                <Typography type="subheading" className={classes.radioAgentLabel}>I have an
                                    agent</Typography>
                                <RadioGroup
                                    selectedValue={!!this.state.have_agent ? '1' : '0'}
                                    onChange={this.handleRadio('have_agent')}
                                    className={classes.radioAgent}>
                                    <FormControlLabel value="1" control={<Radio/>} label="Yes"/>
                                    <FormControlLabel value="0" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </div>

                            <Typography type="caption">If you have an agent, scouts will contact your agent
                                directly.</Typography>


                        </Grid>
                        {!!this.state.have_agent && (
                            <Grid item xs={12}>
                                <TextField fullWidth
                                           error={this.state.errors.indexOf('agent_email') > -1}
                                           label="Agent's Email Address"
                                           value={this.state.agent_email}
                                           onChange={this.handleChange('agent_email')}
                                           className={classes.emailAgentTextField}/>
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <FormControlLabel
                                className={classes.hasLabel}
                                control={
                                    <Checkbox
                                        checked={this.state.agree === '1'}
                                        onChange={this.handleChangeCheckbox('agree')}
                                        value="1"
                                    />
                                }
                                label={<Typography type="body1">
                                    I agree to the <a className={classes.link}>Terms of Service</a> and <a
                                    className={classes.link}>Privacy Policy</a>.
                                </Typography>}/>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel

                                control={
                                    <Checkbox
                                        checked={this.state.subscribe === '1'}
                                        onChange={this.handleChangeCheckbox('subscribe')}
                                        value="1"
                                    />
                                }
                                label="Subscribe to our Newsletter."/>
                        </Grid>


                        <Grid item xs={12} className={classes.buttons}>
                            <Button raised type="submit" color="primary">
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

PlayerForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PlayerForm);