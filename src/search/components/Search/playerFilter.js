/**
 * Created by kirill on 7/28/17.
 * moonion.com
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import {Link, Icon, Pagination, Autosuggest, DropDown} from '../../../common/components';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import DropdownOptions from '../DropdownOptions';
import InputText from '../InputText';

import {PLAYER_MAX_AGE, PLAYER_MIN_AGE} from "../../../common/constants/playerSettings";

import {RangeSlider} from '../../../common/components';
import {filterOnReg} from "../../helpers/helpers";

import {GENDER_LIST, POS_LIST} from '../../../user/constants';

let positionOptions = Object.keys(POS_LIST).map(value => ({
    label: POS_LIST[value],
    value
}));

const genderOptions = Object.keys(GENDER_LIST).map(value => ({
    label: GENDER_LIST[value],
    value
}));



const tipFormatter = (value, index) => {
    return index ? parseInt(value) - 1 : value;
};


const styleSheet = createStyleSheet('ScoutFilter', theme => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

        [theme.breakpoints.down('md')]: {
            padding: 16,
        }
    },
    textField: {
        width: 360,
        maxWidth: 360,
        margin: [0, 44, 44, 0],

        [theme.breakpoints.down('md')]: {
            margin: [0, 15, 44, 15]
        }
    },
    yearLabel: {
        position: 'relative',
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
            gender:'',
            position: '',
            leagues: [],
            born: [PLAYER_MIN_AGE, PLAYER_MAX_AGE],
        };

        this.born = [PLAYER_MIN_AGE, PLAYER_MAX_AGE];
        this.makeFilterRequest = this.makeFilterRequest.bind(this);

        this.onChangeName = this.onChangeName.bind(this);
        this.getRange = this.getRange.bind(this);

    }

    handleChange = (name) => event => {
        return this.setState({[name]: event.target.value}, () => {
            this.makeFilterRequest();
        });
    };

    onChangeAutosuggest = name => (event, {suggestionValue}) => {
        this.setState({[name]: filterOnReg(/^[0-9]+/, suggestionValue)}, () => {
            this.makeFilterRequest();
        });
    };

    onChangeName(event) {
        this.setState({name: event.target.value}, () => {
            this.makeFilterRequest();
        });
    }


    getRange(value) {
        this.setState({born: value}, () => {
            this.makeFilterRequest();
        })
    }

    handleChangeRange = (value) => {
        this.setState({born: value})
    };

    makeFilterRequest() {
        let queryString = '';
        let filters = {};


        let options = {
            id_country: this.state.id_country ? this.state.id_country : null,
            id_league: this.state.id_league ? this.state.id_league : null,
            id_level: this.state.id_level ? this.state.id_level : null,
            id_team_current: this.state.id_team_current ? this.state.id_team_current : null,
            position: this.state.position ? this.state.position : null,
            gender: this.state.gender ? this.state.gender : null,
            'name_search': this.state.name ? this.state.name : null,
            page: this.props.page ? this.props.page : 1
        };



        // Intercom player search
        window.Intercom('update', { app_id: 'coswd1k2' });

        var detail = { 
            country: this.state.id_country ? this.state.id_country : null,
            league: this.state.id_league ? this.state.id_league : null,
            level: this.state.id_level ? this.state.id_level : null,
            team: this.state.id_team_current ? this.state.id_team_current : null,
            position: this.state.position ? this.state.position : null,
            gender: this.state.gender ? this.state.gender : null,
            name_search: this.state.name ? this.state.name : null,
            page: this.props.page ? this.props.page : 1
        };

        Intercom('trackEvent', 'Search players', detail);

        if (this.state.name || this.state.id_league || this.state.id_team_current || this.state.year || this.state.position || this.state.gender || this.state.values || this.state.born || this.state.id_level|| this.state.id_country) {
            queryString += '?';

            for (let key in options) {
                if (options[key] === null)
                    continue;

                filters[key] = options[key];
                queryString += key + '=' + options[key] + '&'
            }

            if (this.state.born[0] !== PLAYER_MIN_AGE || this.state.born[1] !== PLAYER_MAX_AGE) {
                queryString += `born[0]=${this.state.born[0]}&born[1]=${this.state.born[1]}&`;
                filters.born = [parseInt(this.state.born[0]), parseInt(this.state.born[1])];
            }
        }

        this.props.setFilters(filters);
        this.props.filterPlayers(queryString.slice(0, -1));
    }

    changeName = (name) => {
        if (name) {
            this.setState({name: name}, () => {
                this.makeFilterRequest();
            })
        }
    };

    changeLeague = (league, level, country) => {
        this.setState({id_league: league, id_team_current: '', id_level: level, id_country: country}, () => {
            this.makeFilterRequest();
        });
    };

    clearLeague = () => {
        this.setState({id_league: '', dropdownLeagues: [], id_level: '', id_country:''}, () => {
            this.makeFilterRequest();
        });
    };

    clearName = () => {
        this.setState({name: ''}, () => {
            this.makeFilterRequest();
        });
    };

    clearSubFields = () => {
        this.setState({clearSubFields: false});
    };


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
                gender: '',
                born: [PLAYER_MIN_AGE, PLAYER_MAX_AGE],
                name: '',
                clearSubFields: true,
            }, () => {
                nextProps.stopClearing();
            });
        }

        if ('filters' in nextProps) {

            Object.keys(nextProps.filters).forEach(key => {
                this.setState({[key]: nextProps.filters[key]});
            });

            if ('name_search' in nextProps.filters) {
                this.setState({'name': nextProps.filters['name_search']});
            }

            if ('born[0]' in nextProps.filters) {
                this.setState({'born': [parseInt(nextProps.filters['born[0]']), parseInt(nextProps.filters['born[1]'])]});
            }

            if ('id_team_current' in nextProps.filters) {
                this.setState({id_team_current: parseInt(nextProps.filters.id_team_current)});
            }

            if (Object.keys(nextProps.filters).length === 0) {
                this.setState({
                    id_league: '',
                    id_team_current: '',
                    position: '',
                    gender: '',
                    dropdownLeagues: [],
                    born: [PLAYER_MIN_AGE, PLAYER_MAX_AGE],
                    name: '',
                });
            }
        }

        if ('query' in nextProps) {
            this.setState({
                id_league: nextProps.query.id_league ? parseInt(nextProps.query.id_league) : null,
                id_level: nextProps.query.id_level ? parseInt(nextProps.query.id_level) : null,
                id_country: nextProps.query.id_country ? parseInt(nextProps.query.id_country) : null,
            });

        }

    }

    filterTeams = (teams) => {

        if (this.state.id_league) {
            teams = this.props.teamOptions.filter(i => i.item.id_league === parseInt(this.state.id_league));
        }
        else if (this.state.id_level) {
            let leagues = this.props.leagueOptions.filter(i => i.item.id_level == this.state.id_level)
                .map(i => parseInt(i.item.id));
            teams = teams.filter(t => leagues.indexOf(t.item.id_league) !== -1);
        } else if (this.state.id_country) {
            teams = this.props.teamOptions.filter(i => i.item.id_country === parseInt(this.state.id_country));
        }

        return teams;
    };

    render() {
        const {classes} = this.props;

        return (<div className={classNames(classes.row, classes.headerMedia)}>
            <Grid container gutter={40}>
                <Grid item xs={12} md={4}>

                    <DropdownOptions fullWidth
                                     options={[]}
                                     value={1}
                                     label="Country/Level/League"
                                     countries={this.props.countries}
                                     countryOptions={this.props.countryOptions}
                                     levels={this.props.levels}
                                     levelOptions={this.props.levelOptions && this.props.levelOptions.length > 0 ? this.props.levelOptions : []}
                                     leaguesOptions={this.props.leagueOptions}
                                     leagues={this.props.leagues}
                                     changeLeague={this.changeLeague}
                                     clearLeague={this.clearLeague}
                                     country={this.state.id_country || ''}
                                     league={parseInt(this.state.id_league) || this.state.id_league_save || ''}
                                     level={this.state.id_level || ''}


                                     clearSubFields={this.state.clearSubFields}
                                     stopClearing={this.clearSubFields}
                    />


                </Grid>
                <Grid item xs={12}  md={4}>
                    <Autosuggest fullWidth
                                 label="Team"
                                 value={this.props.teams && this.state.id_team_current ? this.props.teams[this.state.id_team_current] || '' : ''}
                                 suggestions={this.filterTeams(this.props.teamOptions)}
                                 onSuggestionSelected={this.onChangeAutosuggest('id_team_current')}/>
                </Grid>
                <Grid item xs={12}  md={4}>
                    <DropDown fullWidth
                              options={positionOptions}
                              label="Position"
                              value={POS_LIST[this.state.position] || ''}
                              onChange={this.handleChange('position')}/>

                </Grid>
                <Grid item xs={12}  md={4}>
                    <RangeSlider onAfterChange={this.getRange}
                                 onChange={this.handleChangeRange}
                                 value={this.state.born}
                                 defaultValue={[PLAYER_MIN_AGE, PLAYER_MAX_AGE]}
                                 tipFormatter={tipFormatter}
                                 label={'Year born'}
                                 min={PLAYER_MIN_AGE}
                                 max={PLAYER_MAX_AGE}/>
                </Grid>
                <Grid item xs={12}  md={4}>
                    <DropDown fullWidth
                              options={genderOptions}
                              label="Gender"
                              value={GENDER_LIST[this.state.gender] || ''}
                              onChange={this.handleChange('gender')}/>
                </Grid>
                <Grid item xs={12}  md={4}>
                    <Hidden only={['xs', 'sm']}>
                        <TextField
                            id="name"
                            label="Name"
                            value={this.state.name || ''}
                            className={classes.textField}
                            onChange={this.onChangeName}
                        />
                    </Hidden>

                    <Hidden only={['md', 'lg', 'xl']}>
                        <InputText options={[]}
                                   value={1}
                                   label="Name"
                                   changeName={this.changeName}
                                   name={this.state.name || ''}
                                   clearName={this.clearName}

                                   clearSubFields={this.state.clearSubFields}
                                   stopClearing={this.clearSubFields}
                        />
                    </Hidden>
                </Grid>

                <Hidden only={['md', 'lg', 'xl']}>
                    <div className={classes.buttonViewContainer}>
                        <Button raised color="primary" className={classes.viewButton} onClick={this.props.viewResults}>
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