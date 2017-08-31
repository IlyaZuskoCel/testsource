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
import {filterOnReg} from "../../helpers/helpers";


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


    onChangeAutosuggest = name => (event, {newValue}) => {

        this.setState({[name]: filterOnReg(/^[0-9]+/ ,newValue) }, () => {
            this.makeFilterRequest();
        });
    };

    makeFilterRequest() {
        let queryString = '';


        let options = {

            id_league: this.state.id_league ? this.state.id_league : null,
            id_team_current: this.state.id_team_current ? this.state.id_team_current : null,
            'name_search' : this.state.name ? this.state.name : null,
        };


        if ( this.state.name  || this.state.id_league || this.state.id_team_current) {
            queryString += '?';

            for (let key in options) {
                if (options[key] === null)
                    continue;

                queryString += key + '=' + options[key] + '&'
            }
        }

        this.props.filterScouts(queryString.slice(0 , -1));
    }

    render() {
        const {classes} = this.props;
        return ( <div className={classes.row}>

            <Grid container gutter={40}>
                <Grid item xs={12} sm={6} md={4}>
                    <Autosuggest fullWidth
                                 suggestions={this.props.leagueOptions}
                                 onSuggestionsFetchRequested={() => {}}
                                 onSuggestionsClearRequested={() => {}}
                                 inputProps={{
                                     label: "League",
                                     value: this.props.leagues[this.state.id_league] || '',
                                     onChange: this.onChangeAutosuggest('id_league'),
                                }}
                        className={classes.textField}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Autosuggest fullWidth
                        suggestions={this.state.id_league ? this.props.teamOptions.filter(i => i.item.id_league === parseInt(this.state.id_league)) : this.props.teamOptions}
                        onSuggestionsFetchRequested={() => {}}
                        onSuggestionsClearRequested={() => {}}
                        inputProps={{
                            label: "Team",
                            value: this.props.teams[this.state.id_team_current] || '',
                            onChange: this.onChangeAutosuggest('id_team_current'),
                        }}
                        className={classes.textField}/>
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