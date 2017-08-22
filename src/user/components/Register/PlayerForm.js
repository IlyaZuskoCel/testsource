/**
 * Created by aleksandr on 7/20/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Radio from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import FormControl from 'material-ui/Form/FormControl';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Link from '../../../common/components/Link';
import {Autosuggest} from "../../../common/components/index";

let leagues=[{label: 'None'},
    {label: 'Atria'},
    {label: 'Callisto'},];

const optionsTeams = [
    {label: 'None'},
    {label: 'Atria'},
    {label: 'Callisto'},
    {label: 'Dione'},
    {label: 'Ganymede'},
    {label: 'Hangouts Call'},
    {label: 'Luna'},
];
const styleSheet = createStyleSheet('PlayerForm', theme => ({

    form: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 40,

    },
    formControl: {
        minWidth: '200%',
        marginLeft: 20,
        alignSelf: 'center',

    },
    formBirthMonth: {
        display: 'inline-table',
        width: '100%',
    },
    formBirthYear: {
        display: 'inline-table',
        width: 'calc(92%-20)',
        marginLeft: 20
    },
    button: {
        maxWidth: 160,
        marginTop: 38,
        alignSelf: 'center',
    },
    grid_container: {
        marginTop: 60,
    },
    grid_flex: {
        display: 'inline-flex'
    },
    radio_buttons_group: {
        display: 'inline-block',
        top: 11,
    },
    player_label: {
        marginLeft: 16,
        marginTop: 8,

    },
    birth: {
        display: 'flex',
        marginLeft: 20,
        width: '100%',
    },
    agent: {
        display: 'inline-block',
        marginTop: 30,
        marginLeft: 20,
    },
    text_agent: {
        width: 400,
        marginLeft: 32,
        marginTop: 18,
    },
    check_box: {
        marginTop: 30,
        marginLeft: 8
    },
    second_check: {
        marginTop: 20
    },
    iam: {
        display: 'inline',
        marginLeft: 16,
    },
    haveAgent: {
        display: 'inline-block',
        marginLeft: 12,
    },
    terms: {
        display: 'inline',
        marginTop: 20,
    },
    subscribe: {
        display: 'inline-flex',
        marginTop: 10,
    },
    link: {
        color: '#d7001e',
        display: 'inline-block',
    },
    text: {
        display: 'inline-block',
    },
    termsPolicy: {
        display: 'inline',
        position: 'absolute',
        width: '100%',
    },
    yes_no_agent: {
        width: 16,
        height: 16,
    },
}));


class PlayerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            birthMonth: '',
            birthYear: '',
            email: '',
            password: '',
            password_repeat: '',
            errors: [],
            selectedValue: 'player',
            yes_no_agent: 'no',
            terms: 'no',
            news: 'no',
            agentEmail: '',
            league: {},
            team: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }

    handleChange(name) {

        return event => {
            if (name === 'birthMonth') {
                if (event.target.value < 1) return this.setState({birthMonth: ''});
                if (event.target.value > 12) return;
            }
            if (name === 'birthYear') {
                if (event.target.value < 1) return this.setState({birthYear: ''});
                if (event.target.value > (new Date()).getFullYear()) return;
            }
            return this.setState({[name]: event.target.value});
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.first_name)
            return this.setState({errors: ['first_name']});

        if (!this.state.last_name)
            return this.setState({errors: ['last_name']});

        if (!this.state.phone)
            return this.setState({errors: ['phone']});

        if (!this.state.birthMonth)
            return this.setState({errors: ['birthMonth']});

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
        //if (this.props.leagues) leagues = this.props.leagues;
        console.log('Props in Player', this.props);
        const classes = this.props.classes;
        return <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container gutter={24} direction={'column'} className={classes.grid_container}>
                <div className={classes.agent}>
                    <Typography type="subheading" className={classes.iam}>I am a</Typography>
                    <FormGroup className={classes.radio_buttons_group}>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={this.state.selectedValue === 'player'}
                                    onChange={this.handleChange('selectedValue')}
                                    value="player"
                                />
                            }
                            label="Player"
                            className={classes.player_label}
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
                </div>
                <Grid item xs={12} sm={6}>
                    <TextField id="first_name"
                               required
                               error={this.state.errors.indexOf('first_name') > -1}
                               label="First Name"
                               value={this.state.first_name}
                               onChange={this.handleChange('first_name')}
                               className={classes.formControl}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="last_name"
                               required
                               error={this.state.errors.indexOf('last_name') > -1}
                               label="Last Name"
                               value={this.state.last_name}
                               onChange={this.handleChange('last_name')}
                               className={classes.formControl}

                    />
                </Grid>
                {this.state.selectedValue === 'player' ? (
                    <Grid item xs={12} sm={6}>
                        {/*show birth fields only if player it is*/}
                        <div className={classes.birth}>
                            <TextField id="birth_month"
                                       required
                                       error={this.state.errors.indexOf('birthMonth') > -1}
                                       label="Month of birth"
                                       value={this.state.birthMonth}
                                       onChange={this.handleChange('birthMonth')}
                                       className={classes.formBirthMonth}
                                       type={'number'}
                            />
                            <TextField id="birth_year"
                                       required
                                       error={this.state.errors.indexOf('birthYear') > -1}
                                       label="Year of birth "
                                       value={this.state.birthYear}
                                       onChange={this.handleChange('birthYear')}
                                       className={classes.formBirthYear}
                                       type={'number'}
                            />
                        </div>
                    </Grid>) : ''}
                {/*Email*/}
                <Grid item xs={12} sm={6}>
                    <TextField id="email"
                               required
                               type="email"
                               error={this.state.errors.indexOf('email') > -1}
                               label="Email Address"
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
                               label="Re-Type Password"
                               value={this.state.password_repeat}
                               onChange={this.handleChange('password_repeat')}
                               className={classes.formControl}
                    />
                </Grid>
                {/*this block shows, player or scout registering*/}
                {this.state.selectedValue === 'player' ? (
                    <div style={{display: 'inline-block'}}>
                        {/* player registering*/}
                        <div className={classes.agent}>
                            <Typography type="subheading" className={classes.haveAgent}>I have an agent</Typography>
                            <FormGroup className={classes.radio_buttons_group}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.yes_no_agent === 'yes'}
                                            onChange={this.handleChange('yes_no_agent')}
                                            value="yes"
                                            className={classes.yes_no_agent}
                                        />
                                    }
                                    label="Yes"
                                    className={classes.player_label}
                                />
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.yes_no_agent === 'no'}
                                            onChange={this.handleChange('yes_no_agent')}
                                            value="no"
                                            className={classes.yes_no_agent}
                                        />
                                    }
                                    label="No"
                                />
                            </FormGroup>
                        </div>
                        <Grid item xs={12} sm={6}>
                            <Typography type="caption" className={classes.text_agent}>If you have an agent, scouts will
                                contact
                                your agent
                                directly.</Typography>
                        </Grid>
                    </div>) : ''}

                {this.state.selectedValue === 'scout' ? (
                    <Grid item xs={12} sm={6}>
                        {/* scout registering*/}
                        {/*League*/}
                        <Autosuggest
                            suggestions={leagues?leagues:[{1:1}]}
                            onSuggestionsFetchRequested={() => {
                            }}
                            onSuggestionsClearRequested={() => {
                            }}
                            inputProps={{
                                label: "League",
                                value: this.state.league.name,
                                onChange: (event, {newValue}) => this.setState({league: newValue}),
                            }}
                            className={classes.formControl}
                        />
                    </Grid>) : ''}

                {this.state.selectedValue === 'scout' ? (
                    <Grid item xs={12} sm={6}>
                        <Autosuggest
                            suggestions={optionsTeams?optionsTeams:[{1:1}]}
                            onSuggestionsFetchRequested={() => {
                                console.log('suggestion was requested');
                            }}
                            onSuggestionsClearRequested={() => {
                            }}
                            inputProps={{
                                label: "Team",
                                value: this.state.team,
                                onChange: (event, {newValue}) => this.setState({team: newValue}),
                            }}
                            className={classes.formControl}
                        />
                    </Grid>) : ''}
                {/*Agent Email*/}
                {this.state.selectedValue === 'player' && this.state.yes_no_agent === 'yes' ? (
                    <Grid item xs={12} sm={6}>
                        <TextField id="agent_email"
                                   required
                                   type="email"
                                   error={this.state.errors.indexOf('agentEmail') > -1}
                                   label="Agent's Email Address"
                                   value={this.state.agentEmail}
                                   onChange={this.handleChange('agentEmail')}
                                   className={classes.formControl}
                        />
                    </Grid>) : ''}
                <Grid item xs={12} className={classes.check_box}>
                    <FormGroup>
                        <div className={classes.terms}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.terms === 'yes'}
                                        onChange={this.handleChange('terms')}
                                        value={this.state.terms === 'yes' ? 'no' : 'yes'}
                                    />
                                }
                                label=''
                            />

                            <div className={classes.termsPolicy}>
                                <Typography type="body1" className={classes.text}>{'I agree with\u00A0'}</Typography>
                                <Link to="/termsofservice">
                                    <Typography type="body1" className={classes.link}>Terms of Service </Typography>
                                </Link>
                                <Typography type="body1" className={classes.text}>{'\u00A0and\u00A0'}</Typography>
                                <Link to="/privacypolicy">
                                    <Typography type="body1" className={classes.link}> Privacy Policy.</Typography>
                                </Link>
                            </div>
                        </div>
                        <div className={classes.subscribe}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.news === 'yes'}
                                        onChange={this.handleChange('news')}
                                        value={this.state.news === 'yes' ? 'no' : 'yes'}
                                    />
                                }
                                label=''
                            />
                            <Typography type="body1">Subscribe to our Newsletter.</Typography>
                        </div>
                    </FormGroup>
                </Grid>
            </Grid>
            <FormControl className={classes.formControl}>
                <Button raised type="submit" color="primary" className={classes.button}>
                    Sign up
                </Button>
            </FormControl>
        </form>
    }
}

PlayerForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PlayerForm);