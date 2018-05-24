/**
 * Created by aleksandr on 8/29/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Helmet from 'react-helmet';

import classNames from 'classnames';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';


import {Link, DateTextField, Autosuggest} from '../../../common/components';


const styleSheet = createStyleSheet('ScoutForm', theme => ({
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
        marginTop: 16
    },
    requiredCaption: {
        marginTop: 40
    }
}));


class ScoutForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

    }


    handleChange = (name) => event => {
        return this.setState({[name]: event.target.value, errors: []});
    };
    handleChangeCheckbox = (name) => event => {
        return this.setState({[name]: this.state[name] === '1' ? '0' : '1', errors: []});
    };
    handleSubmit = e => {
        e.preventDefault();

        if (!this.state.password)
            return this.state({errors: ['password']});

        if (this.state.password !== this.state.password_repeat)
            return this.state({errors: ['password_repeat']});


        if (this.state.id_league === '-1' && !this.state.league)
            return this.setState({errors: ['league']});

        if (this.state.id_team_current === '-1' && !this.state.team)
            return this.setState({errors: ['team']});


        var detail = {           
          name: this.state.first_name+' '+this.state.last_name,
          email: this.state.email,
          country: this.state.id_country,
          league: this.state.id_league,
          team: this.state.id_team_current,
          new_league: this.state.league, 
          new_team: this.state.team, 
          type: 'Scout'
        };

        // Intercom Sign up scout
        if(typeof window !== "undefined" && window.Intercom) {
            window.Intercom('boot', { app_id: window.INTERCOM_ID,
                email: this.state.email,
                name: this.state.first_name+' '+this.state.last_name,
                type: 'Scout',
                country_name: this.state.id_country
            });
            Intercom('trackEvent', 'Sign up scout', detail);
        }

        this.props.register(this.state);
        return false;
    };

    render() {
        const {classes} = this.props;

        let levels = null;

        if (this.state.id_country)
            levels = this.props.levels.filter(l => parseInt(l.id_country) === parseInt(this.state.id_country)).map(l => l.id);

        return (
            <div className={classes.root}>
                <Helmet>
                    <title>{`Sign up scout page`}</title>
                </Helmet>
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required
                                       fullWidth
                                       error={this.state.errors.indexOf('email') > -1}
                                       label="Email Address"
                                       value={this.state.email}
                                       type="email"
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
                            <Autosuggest fullWidth
                                         error={this.state.errors.indexOf('id_country') > -1}
                                         label="Country"
                                         suggestions={this.props.countryOptions}
                                         onSuggestionSelected={(event, {suggestionValue}) => {
                                             this.setState({
                                                 id_country: suggestionValue,
                                                 id_league: '',
                                                 id_team_current: '',
                                                 league: '',
                                                 team: '',
                                             });
                                         }}
                                         value={this.props.countries[this.state.id_country] || ''}/>

                        </Grid>


                        <Grid item xs={12}>
                            <Autosuggest fullWidth
                                         required
                                         error={this.state.errors.indexOf('id_league') > -1}
                                         label="League"
                                         value={this.state.id_league ? (this.props.leagues[this.state.id_league] || this.props.leagues['-1']) : ''}
                                         suggestions={levels ? this.props.leagueOptions.filter(l => l.value === '-1' || levels.indexOf(parseInt(l.item.id_level)) > -1) : this.props.leagueOptions}
                                         onSuggestionSelected={(event, {suggestionValue}) => {
                                             if ((!this.state.id_league && !suggestionValue) || '' + this.state.id_league === '' + suggestionValue) return;

                                             let id_team_current = !suggestionValue ? this.state.id_team_current : '';
                                             if (suggestionValue && this.state.id_team_current && this.state.id_team_current !== '-1' && this.props.teamOptions.find(i => i.value === this.state.id_team_current && i.item.id_league === parseInt(suggestionValue))) {
                                                 id_team_current = this.state.id_team_current
                                             }


                                             this.setState({
                                                 id_league: suggestionValue,
                                                 id_team_current: suggestionValue === '-1' ? '-1' : id_team_current,
                                                 team: suggestionValue === '-1' ? '' : this.state.team,
                                                 league: '',
                                             });
                                         }}/>


                        </Grid>
                        {(this.state.id_league === '-1' ) && (
                            <Grid item xs={12}>
                                <TextField fullWidth
                                           required
                                           error={this.state.errors.indexOf('league') > -1}
                                           label="Type the League and Level name"
                                           value={this.state.league}
                                           onChange={this.handleChange('league')}
                                />
                            </Grid>
                        )}

                        {this.state.id_league !== '-1' && (
                            <Grid item xs={12}>
                                <Autosuggest fullWidth
                                             required
                                             label="Team"
                                             error={this.state.errors.indexOf('id_team_current') > -1}
                                             suggestions={this.state.id_league ? this.props.teamOptions.filter(i => i.value === '-1' || i.item.id_league === parseInt(this.state.id_league)) : this.props.teamOptions}
                                             onSuggestionSelected={(event, {suggestionValue}) => {
                                                 if ((!this.state.id_team_current && !suggestionValue) || '' + this.state.id_team_current === '' + suggestionValue) return;
                                                 this.setState({
                                                     id_team_current: suggestionValue,
                                                     team: '',
                                                 });
                                             }}
                                             value={this.state.id_team_current ? (this.props.teams[this.state.id_team_current] || this.props.teams['-1']) : ''}
                                />
                            </Grid>
                        )}

                        {(this.state.id_league === '-1' || (this.state.id_league && !this.props.leagues[this.state.id_league]) || this.state.id_team_current === '-1' || (this.state.id_team_current && !this.props.teams[this.state.id_team_current])) && (

                            <Grid item xs={12}>
                                <TextField fullWidth
                                           required
                                           error={this.state.errors.indexOf('team') > -1}
                                           label="Type in the full Team name"
                                           value={this.state.team}
                                           onChange={this.handleChange('team')}
                                />
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <Typography type="caption" className={classes.requiredCaption}>*Required fields</Typography>
                        </Grid>
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
                                    I agree to the <a className={classes.link} href="https://scoutzoo.com/term"
                                                      target="_blank">Terms of Service</a> and <a
                                    className={classes.link} href="https://scoutzoo.com/policy" target="_blank">
                                    Privacy Policy</a>.
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

ScoutForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ScoutForm);