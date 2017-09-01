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

import {PlAYER_MAX_AGE , PLAYER_MIN_AGE} from "../../../common/constants/playerSettings";


import queryParse from 'query-string';
import {RangeSlider} from '../../../common/components';
import {filterOnReg} from "../../helpers/helpers";

import {POS_LIST} from '../../../user/constants';

let positionOptions = Object.keys(POS_LIST).map(value => ({
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
    },
    yearLabel: {
        position: 'relative',
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
            born: [PLAYER_MIN_AGE , PlAYER_MAX_AGE]
        };

        this.makeFilterRequest = this.makeFilterRequest.bind(this);

        this.onChangeName = this.onChangeName.bind(this);
        this.getRange = this.getRange.bind(this);
    }


    onChangeAutosuggest = name => (event, {newValue}) => {

            this.setState({[name]: filterOnReg(/^[0-9]+/ ,newValue) }, () => {
                this.makeFilterRequest();
            });
    };


    onChangeName(event) {
        this.setState({name: event.target.value}, () => {
            this.makeFilterRequest();
        });
    }

    getRange(value) {
        if (this.state.born[0] !== value[0] || this.state.born[1] !== value[1]) {
            this.setState({born: value } , () => {
                this.makeFilterRequest();
            })
        }
    }

    makeFilterRequest() {
        let queryString = '';

        let options = {
            id_league: this.state.id_league ? this.state.id_league : null,
            id_team_current: this.state.id_team_current ? this.state.id_team_current : null,
            position: this.state.position ? this.state.position : null,
            'name_search': this.state.name ? this.state.name : null,
        };

        if (this.state.name || this.state.id_league || this.state.id_team_current  || this.state.year || this.state.position || this.state.values || this.state.born) {
            queryString += '?';

            for (let key in options) {
                if (options[key] === null)
                    continue;

                queryString += key + '=' + options[key] + '&'
            }

            queryString += this.state.born[0] !== PLAYER_MIN_AGE || this.state.born[1] !== PlAYER_MAX_AGE  ? `born[0]=${this.state.born[0]}&born[1]=${this.state.born[1]}&` : '';
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
                    <RangeSlider  value={this.state.values} onChange={this.getRange} values={this.state.born} label={'Year born'} />
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