/**
 * Created by kirill on 7/28/17.
 * moonion.com
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import {Link, Icon, Pagination , Autosuggest} from '../../../common/components';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';

import queryParse from 'query-string';

const styleSheet = createStyleSheet('ScoutFilter' , theme => ({
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
            margin: [0 , 15 , 44 , 15]
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
        };

        this.suggestionChanged = this.suggestionChanged.bind(this);
        this.filterBySuggestion = this.filterBySuggestion.bind(this);
        this.handleRequestClearedSuggestions = this.handleRequestClearedSuggestions.bind(this);
        this.makeFilterRequest = this.makeFilterRequest.bind(this);


        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeTeam = this.onChangeTeam.bind(this);
    }

    onChangeTeam(event) {
       this.setState({team : event.target.value}, () => {
           this.makeFilterRequest();
       });
    }

    onChangePosition(event) {
        this.setState({position : event.target.value} , () => {
            this.makeFilterRequest();
        });
    }

    onChangeYear(event) {
        this.setState({year : event.target.value} , () => {
            this.makeFilterRequest();
        });
    }

    onChangeName(event) {
        this.setState({name : event.target.value} , () => {
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


        this.setState({leagues : filteredLeagues});
    }

    handleRequestClearedSuggestions() {
        this.props.filterPlayers('');
    }


    suggestionChanged(event, {newValue , method}) {

        this.setState({
            DropdownValue: newValue,
        } , () => {
            method !== 'type' ? this.makeFilterRequest() : null
        });
    }

    makeFilterRequest() {
        let queryString = '';
        let leag = this.props.leagues.find(league =>  league.short_name === this.state.DropdownValue );

        let options = {
            id_league : this.state.DropdownValue &&  leag ? leag.id : null,
            team : this.state.team ? this.state.team : null,
            position : this.state.position ? this.state.position : null,
            born: this.state.year ? this.state.year.split(',') : null,
            'name_search' : this.state.name ? this.state.name : null,
        };


        if (this.state.DropdownValue || this.state.name || this.state.team || this.state.year || this.state.position) {
            queryString += '?';

            for (let key in options) {
                if (options[key] === null)
                    continue;

                queryString += key + '=' + options[key] + '&'
            }
        }

        this.props.filterPlayers(queryString.slice(0 , -1));
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
            <Grid container gutter={16}>
                <Grid item xs={12} sm={6} md={4}>
                    <Autosuggest
                        suggestions={this.state.leagues}
                        onSuggestionsFetchRequested={this.filterBySuggestion}
                        onSuggestionsClearRequested={this.handleRequestClearedSuggestions}
                        inputProps={{
                            label: "League",
                            value: this.state.DropdownValue,
                            onChange: this.suggestionChanged,
                        }}
                        className={classes.textField}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        id="team"
                        label="Team"
                        value={this.state.team}
                        className={classes.textField}
                        onChange={this.onChangeTeam}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        id="position"
                        label="Position"
                        value={this.state.position}
                        className={classes.textField}
                        onChange={this.onChangePosition}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        id="year"
                        label="Year born"
                        value={this.state.year}
                        className={classes.textField}
                        onChange={this.onChangeYear}
                    />
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