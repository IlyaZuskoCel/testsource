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
import classNames from 'classnames';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';


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


        [theme.breakpoints.down('sm')]: {
            padding: 16,
        }
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
    },

    mobileTextField: {
      width: '100%',
    },

    viewButton: {
        marginBottom: 45,
        marginTop: 50,
    },

    viewTypography: {
        fontSize: 16,
        fontFamily: 'UnitedSansSemiCond-Heavy',
        fontWeight: 900,
        letterSpacing: .3,
        color: '#ffffff',
    },

    buttonViewContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerMedia: {
        [theme.breakpoints.down('lg')]: {
            padding: 20,
        }
    },
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

        this.born = [PLAYER_MIN_AGE , PlAYER_MAX_AGE];
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
        this.setState({born: value} , () => {
            this.makeFilterRequest();
        })
    }
    handleChangeRange = (value) => {
        this.setState({born: value})
    };

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


            if (this.state.born[0] !== PLAYER_MIN_AGE || this.state.born[1] !== PlAYER_MAX_AGE ) {
                queryString += `born[0]=${this.state.born[0]}&born[1]=${this.state.born[1]}&`;
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

        if ('clearField' in nextProps && nextProps.clearField === 'player') {

           this.setState({
               id_league: '',
               id_team_current: '',
               position: '',
               born: [PLAYER_MIN_AGE , PlAYER_MAX_AGE],
               name: '',
           } , () => {
               nextProps.stopClearing();
               this.forceUpdate();
           });
        }

        if ('query' in nextProps && nextProps.query['born[0]']) {
            this.setState({born : [parseInt(nextProps.query['born[0]']) , parseInt(nextProps.query['born[1]'])]})
        }
    }

    render() {
        const {classes , width} = this.props;

            return (<div className={classNames(classes.row , classes.headerMedia)} >
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
                                         value: this.props.leagues[this.state.id_league] ||   this.props.query['id_league'] || '',
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
                                         value: this.props.teams[this.state.id_team_current] || this.props.query['id_team_current']  || '',
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
                                         value: POS_LIST[this.state.position] || this.props.query['position'] || '',
                                         value: POS_LIST[this.state.position] || this.props.query['position'] || '',
                                         onChange: this.onChangeAutosuggest('position'),
                                     }}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                            <RangeSlider  onAfterChange={this.getRange}
                                          onChange={this.handleChangeRange}
                                          value={this.state.born}
                                          defaultValue={[PLAYER_MIN_AGE , PlAYER_MAX_AGE]}
                                          label={'Year born'}
                                          min={PLAYER_MIN_AGE}
                                          max={PlAYER_MAX_AGE}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            id="name"
                            label="Name"
                            value={this.state.name || this.props.query['name_search'] || ''}
                            className={width === 'xl' || width === 'lg' || width === 'md' ? classes.textField : classes.mobileTextField}
                            onChange={this.onChangeName}
                        />
                    </Grid>

                    <Hidden smUp>
                        <div className={classes.buttonViewContainer}>
                            <Button raised color="primary" className={classes.viewButton} onClick={this.props.viewResults} >
                                <Typography className={classes.viewTypography}>
                                    view all {this.props.total} players
                                </Typography>
                            </Button>
                        </div>
                    </Hidden>

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