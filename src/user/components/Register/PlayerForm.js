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


const styleSheet = createStyleSheet('PlayerForm', theme => ({

    form: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 40,

    },
    formControl: {
        minWidth: '100%',
        marginLeft: 20,
        //alignSelf: 'center',

    },
    formBirthMonth: {
        display: 'table',

    },
    formBirthYear: {
        display: 'table',

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
    have_agent: {
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
            have_agent: 'no',
            agree: 'no',
            subscribe: 'no',
            agent_email: '',
            showingTeams: [],
            league: '',
            team: '',
        };

    }


    handleChange = (name) => {

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
    };

    handleSubmit = (e) => {
        e.preventDefault();
        /*   console.log(1);
            if (!this.state.first_name)
                return this.setState({errors: ['first_name']});
           // console.log(2);
            if (!this.state.last_name)
                return this.setState({errors: ['last_name']});
          //  console.log(3);
            if (this.props.index === 0 && !this.state.birthMonth)
                return this.setState({errors: ['birthMonth']});
           // console.log(4);
            if (this.props.index === 0 && !this.state.birthYear)
                return this.setState({errors: ['birthYear']});
          //  console.log(5);
            if (!this.state.email)
                return this.setState({errors: ['email']});
            //console.log(6);
            if (!this.state.password)
                return this.setState({errors: ['password']});
            //console.log(7);
            if (!this.state.password_repeat)
                return this.setState({errors: ['password_repeat']});

         console.log('before passwords comparing');
         if (this.state.password !== this.state.password_repeat)
             return this.setState({errors: ['password_repeat', 'password']});

         console.log('before agree', this.state.agree);
         if (this.state.agree === 'no')
             return this.setState({errors: ['agree']});

         console.log('before agent_email');
         if (this.state.have_agent === 'yes' && !this.state.agent_email)
             return this.setState({errors: ['agent_email']});

         console.log('all fields are ok, before submitting ');*/
        let user = Object.assign({}, this.state);
        // player registration
        /**
         "first_name":"Fedor",
         "last_name":"Fedorov",
         "email":"fedor@ss.ss",
         "password":"123456",
         "password_repeat":"123456",
         "birthday":"1989-11",
         "have_agent":"1",
         "agent_email":"agent@mail.mail",
         "agree":"1",
         "subscribe":"1"
         */
        if (this.props.index === 0) {
            user.agree = user.agree === 'yes' ? 1 : 0;
            user.subscribe = user.subscribe === 'yes' ? 1 : 0;
            user.have_agent = user.have_agent === 'yes' ? 1 : 0;
            user.birthday = user.birthYear + '-' + user.birthMonth;
            delete user.showingTeams;
            delete user.birthMonth;
            delete user.birthYear;
            delete user.league;
            delete user.team;
            delete user.errors;
            console.log('user', user);
            this.props.onSubmit(user);
        }
        // scout registration
        /**
         "first_name":"Ivan",
         "last_name":"Ivanov",
         "email":"ivan@ss.ss",
         "password":"123456",
         "password_repeat":"123456",
         "id_league":"1",
         "id_team_current":"20",
         "agree":"1",
         "subscribe":"1"
         */
        else {
            user.agree = user.agree === 'yes' ? 1 : 0;
            user.subscribe = user.subscribe === 'yes' ? 1 : 0;
            let id_league = (this.props.leagues.find(league => league.label === this.state.league)).id;
            let id_team_current = (this.props.teams.find(team => team.label === this.state.team)).id;
            console.log('id_league', id_league);
            console.log('id_team', id_team_current);
            user.id_league = id_league;
            user.id_team_current = id_team_current;
            delete user.showingTeams;
            delete user.birthMonth;
            delete user.birthYear;
            delete user.league;
            delete user.team;
            delete user.errors;
            delete user.have_agent;
            delete user.agent_email;
            console.log('user', user);
            this.props.onSubmit(user);
        }

        return false;
    };

    getShowingTeams = (name) => {
        if (!name || this.props.leagues.length === 0 || this.props.teams.length === 0) return [];
        let league = this.props.leagues.find(el => el.label === name);
        if (!league) return [];
        return this.props.teams.filter(team => team.id_league === league.id);
    };

    handleLeagueChange = (event, {newValue}) => {
        this.setState({
            league: newValue,
            team: '',
            showingTeams: this.getShowingTeams(newValue),
        });
    };

    render() {
        const classes = this.props.classes;
        //console.log('props of Player',this.props);
        return <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container gutter={24} direction={'column'} className={classes.grid_container}>
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
                {this.props.index === 0 ? (
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
                {this.props.index === 0 ? (
                    <div style={{display: 'inline-block'}}>
                        {/* player registering*/}
                        <div className={classes.agent}>
                            <Typography type="subheading" className={classes.haveAgent}>I have an agent</Typography>
                            <FormGroup className={classes.radio_buttons_group}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.have_agent === 'yes'}
                                            onChange={this.handleChange('have_agent')}
                                            value="yes"
                                            className={classes.have_agent}
                                        />
                                    }
                                    label="Yes"
                                    className={classes.player_label}
                                />
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.have_agent === 'no'}
                                            onChange={this.handleChange('have_agent')}
                                            value="no"
                                            className={classes.have_agent}
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

                {this.props.index === 1 ? (
                    <Grid item xs={12} sm={6}>
                        {/* scout registering*/}
                        {/*League*/}
                        <Autosuggest
                            suggestions={this.props.leagues}
                            onSuggestionsFetchRequested={() => {
                            }}
                            onSuggestionsClearRequested={() => {
                            }}
                            inputProps={{
                                label: "League",
                                value: this.state.league,
                                onChange: this.handleLeagueChange
                            }}
                            className={classes.formControl}
                        />
                    </Grid>) : ''}
                {this.props.index === 1 ? (
                    <Grid item xs={12} sm={6}>
                        <Autosuggest
                            suggestions={this.state.showingTeams}
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
                {this.props.index === 0 && this.state.have_agent === 'yes' ? (
                    <Grid item xs={12} sm={6}>
                        <TextField id="agent_email"
                                   required
                                   type="email"
                                   error={this.state.errors.indexOf('agent_email') > -1}
                                   label="Agent's Email Address"
                                   value={this.state.agent_email}
                                   onChange={this.handleChange('agent_email')}
                                   className={classes.formControl}
                        />
                    </Grid>) : ''}
                <Grid item xs={12} sm={6} className={classes.check_box}>
                    <FormGroup>
                        <div className={classes.terms}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.agree === 'yes'}
                                        onChange={this.handleChange('agree')}
                                        value={this.state.agree === 'yes' ? 'no' : 'yes'}
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
                                        checked={this.state.subscribe === 'yes'}
                                        onChange={this.handleChange('subscribe')}
                                        value={this.state.subscribe === 'yes' ? 'no' : 'yes'}
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