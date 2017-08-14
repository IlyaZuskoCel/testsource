/**
 * Created by aleksandr on 7/20/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import FormControl from 'material-ui/Form/FormControl';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('PlayerForm', theme => ({

    form: {
        flexGrow: 1,
        padding: 10
    },
    formControl: {
        width: '100%',
        alignItems: 'center',

    },
    formBirthDate: {
        width: 200,

    },
    formBirthYear: {
        width: 200,
        marginLeft: 30
    },
}));


class PlayerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            phone: '',
            birthDay: '',
            birthYear: '',
            email: '',
            password: '',
            password_repeat: '',
            errors: [],
            selectedValue: 'player',
            yes_no_agent: 'no',
            terms: 'no',
            news: 'no',
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(name) {
        return event => this.setState({[name]: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.first_name)
            return this.setState({errors: ['first_name']});

        if (!this.state.last_name)
            return this.setState({errors: ['last_name']});

        if (!this.state.phone)
            return this.setState({errors: ['phone']});

        if (!this.state.birthDay)
            return this.setState({errors: ['birthDay']});

        if (!this.state.birthYear)
            return this.setState({errors: ['birthYear']});

        if (!this.state.email)
            return this.setState({errors: ['email']});

        if (!this.state.password)
            return this.setState({errors: ['password']});

        if (!this.state.password_repeat)
            return this.setState({errors: ['password_repeat']});

        if (this.state.password !== this.state.password_repeat)
            return this.setState({errors: ['password_repeat', 'password']});

        this.props.onSubmit(this.state);
        return false;
    }

    render() {
        const classes = this.props.classes;

        return <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container gutter={24} direction={'column'} style={{marginTop: 60}}>
                <Grid item xs={12} style={{display: 'inline-flex'}}>
                    <Typography type="subheading">I am a</Typography>
                    <FormGroup style={{display: 'inline',}}>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={this.state.selectedValue === 'player'}
                                    onChange={this.handleChange('selectedValue')}
                                    value="player"

                                />
                            }
                            label="Player"
                            style={{marginLeft: 16, marginTop: 8}}
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={this.state.selectedValue === 'scout'}
                                    onChange={this.handleChange('selectedValue')}
                                    value="scout"

                                />
                            }
                            label="Scout"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField id="first_name"
                               required
                               error={this.state.errors.indexOf('first_name') > -1}
                               label="First Name"
                               value={this.state.first_name}
                               onChange={this.handleChange('first_name')}
                               className={classes.formControl}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField id="last_name"
                               required
                               error={this.state.errors.indexOf('last_name') > -1}
                               label="Last Name"
                               value={this.state.last_name}
                               onChange={this.handleChange('last_name')}
                               className={classes.formControl}
                               slyle={{marginLeft: 20}}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div style={{display: 'inline-flex'}}>
                        <TextField id="birth_day"
                                   required
                                   error={this.state.errors.indexOf('birthDay') > -1}
                                   label="Date of birth"
                                   value={this.state.birthDay}
                                   onChange={this.handleChange('birthDay')}
                                   className={classes.formBirthDate}
                        />
                        <TextField id="birth_year"
                                   required
                                   error={this.state.errors.indexOf('birthYear') > -1}
                                   label=" "
                                   value={this.state.birthYear}
                                   onChange={this.handleChange('birthYear')}
                                   className={classes.formBirthYear}
                        />
                    </div>
                </Grid>


                <Grid item xs={12} sm={6}>
                    <TextField id="phone"
                               required
                               error={this.state.errors.indexOf('phone') > -1}
                               label="Phone"
                               value={this.state.phone}
                               onChange={this.handleChange('phone')}
                               className={classes.formControl}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="email"
                               required
                               type="email"
                               error={this.state.errors.indexOf('email') > -1}
                               label="Email"
                               value={this.state.email}
                               onChange={this.handleChange('email')}
                               className={classes.formControl}
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <TextField id="password"
                               type="password"
                               required
                               error={this.state.errors.indexOf('password') > -1}
                               label="Password"
                               value={this.state.password}
                               onChange={this.handleChange('password')}
                               className={classes.formControl}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="password_repeat"
                               type="password"
                               required
                               error={this.state.errors.indexOf('password_repeat') > -1}
                               label="Confirm Password"
                               value={this.state.password_repeat}
                               onChange={this.handleChange('password_repeat')}
                               className={classes.formControl}
                    />
                </Grid>
                <Grid item xs={12} style={{display: 'inline-flex', marginTop: 30,marginLeft:8}}>
                    <Typography type="subheading">I have an agent</Typography>
                    <FormGroup style={{display: 'inline',}}>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={this.state.yes_no_agent === 'yes'}
                                    onChange={this.handleChange('yes_no_agent')}
                                    value="yes"

                                />
                            }
                            label="Yes"
                            style={{marginLeft: 16, marginTop: 8}}
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={this.state.yes_no_agent === 'no'}
                                    onChange={this.handleChange('yes_no_agent')}
                                    value="no"

                                />
                            }
                            label="No"
                        />
                    </FormGroup>

                </Grid>
                <Grid item xs={12} sm={6} style={{marginLeft:8}}>
                    <Typography type="caption" style={{width:400}}>If you have an agent, scouts will contact your agent directly.</Typography>
                </Grid>

                <Grid item xs={12} style={{marginTop: 30}}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.terms ==='yes'}
                                    onChange={this.handleChange('terms')}
                                    value={this.state.terms==='yes'?'no':'yes'}
                                />
                            }
                            label="I agree to the Terms of Service and Privacy Policy."
                            style={{marginTop: 8}}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.news==='yes'}
                                    onChange={this.handleChange('news')}
                                    value={this.state.news==='yes'?'no':'yes'}
                                />
                            }
                            label="Subscribe to our Newsletter."
                            style={{marginTop: 20}}
                        />
                    </FormGroup>

                </Grid>
            </Grid>

            <Grid container gutter={24} direction={'column'} style={{marginTop: 60, marginBottom: 60,}}>
                <FormControl className={classes.formControl}>
                    <Button raised type="submit" color="primary" className={classes.button}>
                        Sign up
                    </Button>
                </FormControl>
            </Grid>

        </form>
    }
}

PlayerForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PlayerForm);