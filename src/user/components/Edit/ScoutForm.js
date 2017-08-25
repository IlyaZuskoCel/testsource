/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';

import {DateTextField, HeightTextField, Autosuggest} from '../../../common/components';


import {GENDER_LIST, POS_LIST, SHOT_LIST} from '../../constants';

const genderOptions = Object.keys(GENDER_LIST).map(value => ({
    label: GENDER_LIST[value],
    value
}));

const positionOptions = Object.keys(POS_LIST).map(value => ({
    label: POS_LIST[value],
    value
}));

const shotOptions = Object.keys(SHOT_LIST).map(value => ({
    label: SHOT_LIST[value],
    value
}));

const styleSheet = createStyleSheet('ScoutForm', theme => ({
    root: {},
    subTitle: {marginTop: 80, marginBottom: 40},
    buttons: {
        marginTop: 56
    },
    buttonCancel: {
        marginRight: 24,
        marginBottom: 24
    },
    rememberTitle: {
        paddingBottom: 24
    }
}));


const getUserState = user => ({
    first_name: user.first_name,
    last_name: user.last_name,
    job_title: user.job_title,
    id_league: user.id_league,
    id_team_current: user.id_team_current,
    biography: user.biography,
});

class ScoutForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...getUserState(props.user),
            errors: []
        };
    }

    componentDidMount() {
        this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(getUserState(nextProps.user))
    }

    handleChange = name => event => {
        return this.setState({[name]: event.target.value})
    };
    submit = event => {
        event.preventDefault();
        this.props.save(this.state);
        return false;
    };

    render() {
        const {classes, className} = this.props;

        return <form className={classNames(classes.root, className)} onSubmit={this.submit}>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth
                               error={this.state.errors.indexOf('first_name') > -1}
                               required
                               label="First Name"
                               value={this.state.first_name || ''}
                               onChange={this.handleChange('first_name')}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth
                               error={this.state.errors.indexOf('last_name') > -1}
                               required
                               label="Last Name"
                               value={this.state.last_name || ''}
                               onChange={this.handleChange('last_name')}/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField fullWidth
                               error={this.state.errors.indexOf('job_title') > -1}
                               label="Job Title"
                               value={this.state.job_title || ''}
                               onChange={this.handleChange('job_title')}/>
                </Grid>

            </Grid>
            <Typography type="subheading" className={classes.subTitle}>Team Information</Typography>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Autosuggest fullWidth
                                 required
                                 error={this.state.errors.indexOf('id_league') > -1}
                                 suggestions={this.props.leagueOptions}
                                 onSuggestionsFetchRequested={() => {
                                 }}
                                 onSuggestionsClearRequested={() => {
                                 }}
                                 inputProps={{
                                     label: "Current League",
                                     value: this.props.leagues[this.state.id_league] || '',
                                     onChange: (event, {newValue}) => this.setState({id_league: newValue}),
                                 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <Autosuggest fullWidth
                                 required
                                 error={this.state.errors.indexOf('id_team_current') > -1}
                                 suggestions={this.state.id_league ? this.props.teamOptions.filter(i => i.item.id_league === parseInt(this.state.id_league)) : this.props.teamOptions}
                                 onSuggestionsFetchRequested={() => {
                                 }}
                                 onSuggestionsClearRequested={() => {
                                 }}
                                 inputProps={{
                                     label: "Current or Most Recent Team",
                                     value: this.props.teams[this.state.id_team_current] || '',
                                     onChange: (event, {newValue}) => this.setState({id_team_current: newValue}),
                                 }}
                    />
                </Grid>
            </Grid>


            <Typography type="subheading" className={classes.subTitle}>About Me</Typography>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <TextField fullWidth
                               error={this.state.errors.indexOf('weight') > -1}
                               multiline
                               rowsMax="4"
                               rows="1"
                               label="Tell us about yourself"
                               value={this.state.biography || ''}
                               onChange={this.handleChange('biography')}/>

                </Grid>
            </Grid>
            <Hidden xsDown>
                <div className={classes.buttons}>
                    <Button raised onClick={this.props.cancel} className={classes.buttonCancel}>Cancel</Button>
                    <Button raised color="primary" type="submit">Save</Button>
                </div>
            </Hidden>
        </form>
    }
}

ScoutForm.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(ScoutForm);