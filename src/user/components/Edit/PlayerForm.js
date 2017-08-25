/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';


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

const styleSheet = createStyleSheet('PlayerForm', theme => ({
    root: {
        paddingBottom: 96
    },
    subTitle: {marginTop: 80, marginBottom: 40},
    buttons: {
        marginTop: 56
    }
}));


const getUserState = user => ({
    first_name: user.first_name,
    last_name: user.last_name,
    birthday: user.birthday,
    gender: user.gender,
    nationality: user.nationality,
    position: user.position,
    shot: user.shot,
    player_num: user.player_num,
    height: user.height,
    weight: user.weight,
    id_league: user.id_league,
    id_team_current: user.id_team_current,
    biography: user.biography,
});

class PlayerForm extends Component {
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
                    <DateTextField required
                                   fullWidth
                                   error={this.state.errors.indexOf('birthday') > -1}
                                   label="Date of Birth"
                                   value={this.state.birthday}
                                   onChange={this.handleChange('birthday')}/>

                </Grid>
                <Grid item xs={12} md={6}>
                    <Autosuggest fullWidth
                                 error={this.state.errors.indexOf('gender') > -1}
                                 suggestions={genderOptions}
                                 onSuggestionsFetchRequested={() => {
                                 }}
                                 onSuggestionsClearRequested={() => {
                                 }}
                                 inputProps={{
                                     label: "Gender",
                                     value: GENDER_LIST[this.state.gender] || '',
                                     onChange: (event, {newValue}) => this.setState({gender: newValue}),
                                 }}
                    />

                </Grid>
                <Grid item xs={12} md={6}>
                    <Autosuggest fullWidth
                                 error={this.state.errors.indexOf('nationality') > -1}
                                 suggestions={this.props.nationalityOptions}
                                 onSuggestionsFetchRequested={() => {
                                 }}
                                 onSuggestionsClearRequested={() => {
                                 }}
                                 inputProps={{
                                     label: "Nationality",
                                     value: this.props.nationalities[this.state.nationality] || '',
                                     onChange: (event, {newValue}) => this.setState({nationality: newValue}),
                                 }}
                    />

                </Grid>

            </Grid>
            <Typography type="subheading" className={classes.subTitle}>Hockey Information</Typography>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Autosuggest fullWidth
                                 error={this.state.errors.indexOf('position') > -1}
                                 suggestions={positionOptions}
                                 onSuggestionsFetchRequested={() => {
                                 }}
                                 onSuggestionsClearRequested={() => {
                                 }}
                                 inputProps={{
                                     label: "Position",
                                     value: POS_LIST[this.state.position] || '',
                                     onChange: (event, {newValue}) => this.setState({position: newValue}),
                                 }}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <Autosuggest fullWidth
                                 error={this.state.errors.indexOf('shot') > -1}
                                 suggestions={shotOptions}
                                 onSuggestionsFetchRequested={() => {
                                 }}
                                 onSuggestionsClearRequested={() => {
                                 }}
                                 inputProps={{
                                     label: "Shot",
                                     value: SHOT_LIST[this.state.shot] || '',
                                     onChange: (event, {newValue}) => this.setState({shot: newValue}),
                                 }}
                    />
                </Grid>

                <Grid item xs={6} md={6}>
                    <TextField fullWidth
                               label="Jersey number"
                               error={this.state.errors.indexOf('player_num') > -1}
                               value={this.state.player_num || ''}
                               onChange={this.handleChange('player_num')}/>
                </Grid>

                <Grid item xs={6} md={6}>
                    <HeightTextField fullWidth
                                     error={this.state.errors.indexOf('height') > -1}
                                     label="Height"
                                     value={this.state.height}
                                     onChange={this.handleChange('height')}/>

                </Grid>

                <Grid item xs={6} md={6}>
                    <TextField fullWidth
                               error={this.state.errors.indexOf('weight') > -1}
                               label="Weight (lbs)"
                               value={this.state.weight || ''}
                               onChange={this.handleChange('weight')}/>
                </Grid>


            </Grid>
            <Typography type="subheading" className={classes.subTitle}>Team Information</Typography>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Autosuggest fullWidth
                                 error={this.state.errors.indexOf('id_league') > -1}
                                 suggestions={this.props.leagueOptions}
                                 onSuggestionsFetchRequested={() => {
                                 }}
                                 onSuggestionsClearRequested={() => {
                                 }}
                                 inputProps={{
                                     label: "Current or Most Recent League",
                                     value: this.props.leagues[this.state.id_league] || '',
                                     onChange: (event, {newValue}) => this.setState({id_league: newValue}),
                                 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <Autosuggest fullWidth
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
            <Typography type="caption">Remember, scouts will be reading this before they decide to contact
                you.</Typography>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <TextField fullWidth
                               error={this.state.errors.indexOf('weight') > -1}
                               multiline
                               rowsMax="4"
                               rows="2"
                               label="Tell us about yourself"
                               value={this.state.biography || ''}
                               onChange={this.handleChange('biography')}/>

                </Grid>
            </Grid>
            <Grid container className={classes.buttons}>
                <Grid item xs={3}>
                    <Button raised onClick={this.props.cancel}>Cancel</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button raised color="primary" type="submit">Save</Button>
                </Grid>
            </Grid>
        </form>
    }
}

PlayerForm.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PlayerForm);