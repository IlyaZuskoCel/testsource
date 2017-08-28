/**
 * Created by kirill on 7/25/17.
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

        [theme.breakpoints.down('md')]: {
            width: '90%',
            maxWidth: 340,
        },

        [theme.breakpoints.down('sm')]: {
            margin: [17 , 'auto'],
        }
    }
}));

class ScoutFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            DropdownValue: '',
            leagues: [],
            team: '',
            name: '',
        }

        this.filterBySuggestion = this.filterBySuggestion.bind(this);
        this.suggestionChanged = this.suggestionChanged.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.makeFilterRequest = this.makeFilterRequest.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.leagues.length > 0) {
            this.setState({
                leagues: nextProps.leagues.map(league => ({label: league.short_name}))
            });
        }
    }

    filterBySuggestion(suggestion) {

        console.log(suggestion);

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

        console.log(filteredLeagues);

        this.setState({leagues : filteredLeagues});
    }

    suggestionChanged(event, {newValue}) {
        this.setState({
            DropdownValue: newValue,
        } , () => {
            this.makeFilterRequest();
        });
    }


    changeName(event) {
        this.setState({name : event.target.value} , () => {
            this.makeFilterRequest();
        })
    }

    changeTeam(event) {
        this.setState({team : event.target.value} , () => {
            this.makeFilterRequest();
        })
    }


    makeFilterRequest() {
        let queryString = '';
        let leag = this.props.leagues.find(league =>  league.short_name === this.state.DropdownValue );


        let options = {
            id_league : this.state.DropdownValue &&  leag ? leag.id : null,
            team : this.state.team ? this.state.team : null,
            name : this.state.name ? this.state.name : null,
        };


        if (this.state.DropdownValue || this.state.name || this.state.type) {
            queryString += '?';

            for (let key in options) {
                if (options[key] === null)
                    continue;

                queryString += key + '=' + options[key] + '&'
            }
        }

        // this.props.go('/search/scout' + queryString.slice(0, -1));
    }

    render() {
        const {classes} = this.props;
        return ( <div className={classes.row}>

            <Grid container gutter={40}>
                <Grid item xs={12} sm={6} md={4}>
                    <Autosuggest
                        suggestions={this.state.leagues}
                        onSuggestionsFetchRequested={this.filterBySuggestion}
                        onSuggestionsClearRequested={(boom) => {}}
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
                        onChange={this.changeTeam}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        id="name"
                        label="Name"
                        value={this.state.name}
                        className={classes.textField}
                        onChange={this.changeName}
                    />
                </Grid>
            </Grid>
        </div>)
    }
}


ScoutFilter.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string,
};

export default compose(withStyles(styleSheet), withWidth())(ScoutFilter);