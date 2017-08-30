/**
 * Created by kirill on 7/28/17.
 * moonion.com
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import {Link, Icon, Pagination, Autosuggest} from '../../../common/components';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';


import queryParse from 'query-string';
import {RangeSlider} from '../../../common/components';

import {POS_LIST} from '../../../user/constants';

const positionOptions = Object.keys(POS_LIST).map(value => ({
    label: POS_LIST[value],
    value
}));

const styleSheet = createStyleSheet('ScoutFilter', theme => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textField: {
        width: 360,
        maxWidth: 360,
        margin: [0, 44, 44, 0],

        [theme.breakpoints.down('sm')]: {
            margin: [0, 15, 44, 15]
        }
    }
}));

class PlayerFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            DropdownValue: '',
            name: '',
            team: '',
            year: '',
            position: '',
            leagues: [],
            values: [1980, 2017]
        };

        this.suggestionChanged = this.suggestionChanged.bind(this);
        this.filterBySuggestion = this.filterBySuggestion.bind(this);
        this.handleRequestClearedSuggestions = this.handleRequestClearedSuggestions.bind(this);
        this.makeFilterRequest = this.makeFilterRequest.bind(this);


        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeTeam = this.onChangeTeam.bind(this);
        this.getRange = this.getRange.bind(this);
    }

    onChangeTeam(event) {
        this.setState({team: event.target.value}, () => {
            this.makeFilterRequest();
        });
    }

    onChangeAutosuggest = name => (event, {newValue}) => {
        this.setState({[name]: newValue}, () => {
            this.makeFilterRequest();
        });
    };

    onChangeYear(event) {
        this.setState({year: event.target.value}, () => {
            this.makeFilterRequest();
        });
    }

    onChangeName(event) {
        this.setState({name: event.target.value}, () => {
            this.makeFilterRequest();
        });
    }

    filterBySuggestion(suggestion) {

        if (suggestion.value === "") {
            this.setState({
                leagues: this.props.leagues.map(league => ({label: league.short_name}))
            });

            return;
        }

        let filterWord = suggestion.value.toUpperCase();

        let filteredLeagues = this.state.leagues.filter(league => {
            return league.label.startsWith(filterWord);
        });


        this.setState({leagues: filteredLeagues});
    }

    handleRequestClearedSuggestions() {
        this.props.filterPlayers('');
    }


    suggestionChanged(event, {newValue, method}) {

        this.setState({
            DropdownValue: newValue,
        }, () => {
            method !== 'type' ? this.makeFilterRequest() : null
        });
    }

    getRange(value) {
        this.setState({values: value}, () => {
            this.makeFilterRequest();
        })
    }

    makeFilterRequest() {
        let queryString = '';

        let options = {
            id_league: this.state.id_league ? this.state.id_league : null,
            id_team_current: this.state.id_team_current ? this.state.id_team_current : null,
            position: this.state.position ? this.state.position : null,
            'name_search': this.state.name ? this.state.name : null,
        };

        if (this.state.name || this.state.id_league || this.state.id_team_current  || this.state.year || this.state.position || this.state.values) {
            queryString += '?';

            for (let key in options) {
                if (options[key] === null)
                    continue;

                queryString += key + '=' + options[key] + '&'
            }

            if (this.state.values || (this.state.values[0] != 1980 && this.state.values[0] != 2017)) {
                queryString += `born[0]=${this.state.values[0]}&born[1]=${this.state.values[1]}&`;
            }
        }

        this.props.filterPlayers(queryString.slice(0, -1));
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.leagues.length > 0) {
            this.setState({
                leagues: nextProps.leagues.map(league => ({label: league.short_name}))
            });
        }
    }

    render() {
        const {classes} = this.props;

        return (<div className={classes.row}>
            <Grid container gutter={40}>
                <Grid item xs={12} sm={6} md={4}>

                    <Autosuggest fullWidth
                                 suggestions={this.props.leagueOptions}
                                 onSuggestionsFetchRequested={() => {
                                 }}
                                 onSuggestionsClearRequested={() => {
                                 }}
                                 inputProps={{
                                     label: "League",
                                     value: this.props.leagues[this.state.id_league] || '',
                                     onChange: this.onChangeAutosuggest('id_league'),
                                 }}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Autosuggest fullWidth
                                 suggestions={this.state.id_league ? this.props.teamOptions.filter(i => i.item.id_league === parseInt(this.state.id_league)) : this.props.teamOptions}
                                 onSuggestionsFetchRequested={() => {
                                 }}
                                 onSuggestionsClearRequested={() => {
                                 }}
                                 inputProps={{
                                     label: "Team",
                                     value: this.props.teams[this.state.id_team_current] || '',
                                     onChange: this.onChangeAutosuggest('id_team_current'),
                                 }}/>


                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Autosuggest fullWidth
                                 suggestions={positionOptions}
                                 onSuggestionsFetchRequested={() => {
                                 }}
                                 onSuggestionsClearRequested={() => {
                                 }}
                                 inputProps={{
                                     label: "Position",
                                     value: POS_LIST[this.state.position] || '',
                                     onChange: this.onChangeAutosuggest('position'),
                                 }}
                    />

                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <RangeSlider min={1988} max={2017} value={this.state.values} onChange={this.getRange}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        id="name"
                        label="Name"
                        value={this.state.name}
                        className={classes.textField}
                        onChange={this.onChangeName}
                    />
                </Grid>
            </Grid>
        </div>);
    }
}

PlayerFilter.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string,
};

export default compose(withStyles(styleSheet), withWidth())(PlayerFilter);