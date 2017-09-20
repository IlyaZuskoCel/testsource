/**
 * Created by kirill on 7/25/17.
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
import {filterOnReg} from "../../helpers/helpers";
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';

import InputText from '../InputText';
import DropdownOptions from '../DropdownOptions';

import classNames from 'classnames';

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

        [theme.breakpoints.down('md')]: {
            width: '90%',
            maxWidth: 340,
        },

        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            width: '100%',
            margin: [0, 0, 0, 0],
        }
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
        };

        this.changeName = this.changeName.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.makeFilterRequest = this.makeFilterRequest.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.leagues.length > 0) {
            this.setState({
                leagues: nextProps.leagues.map(league => ({label: league.short_name}))
            });
        }

        if ('clearField' in nextProps && nextProps.clearField === 'scout') {
            this.setState({
                id_league: '',
                id_team_current: '',
                name: '',
            }, () => {
                nextProps.stopClearing();
            });
        }

        if ('query' in nextProps ) {
            this.setState({
                id_league_save: nextProps.query.id_league ? parseInt(nextProps.query.id_league ) : null,
                id_level: nextProps.query.id_level ? parseInt(nextProps.query.id_level) : null
            })
        }

        if ('filters' in nextProps) {
            Object.keys(nextProps.filters).forEach(key => {
                this.setState({[key] : nextProps.filters[key]});
            });

            if ('name_search' in nextProps.filters) {
                this.setState({'name' : nextProps.filters['name_search']});
            }

            if (Object.keys(nextProps.filters).length === 0) {
                this.setState({
                    id_league: '',
                    id_team_current: '',
                    name: '',
                });
            }
        }
    }

    onChangeName(event) {
        this.setState({name: event.target.value}, () => {
            this.makeFilterRequest();
        })
    }

    changeTeam(event) {
        this.setState({team: event.target.value}, () => {
            this.makeFilterRequest();
        })
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

    makeFilterRequest() {
        let queryString = '';
        let filters = {};


        let options = {
            id_league: this.state.id_league ? this.state.id_league : null,
            id_team_current: this.state.id_team_current ? this.state.id_team_current : null,
            id_level: this.state.id_level ? this.state.id_level : null,
            'name_search': this.state.name ? this.state.name : null,
        };

        if (this.state.name || this.state.id_league || this.state.id_team_current || this.state.id_level) {
            queryString += '?';

            for (let key in options) {
                if (options[key] === null)
                    continue;

                queryString += key + '=' + options[key] + '&'
                filters[key] = options[key];
            }
        }

        this.props.filterScouts(queryString.slice(0, -1));
        this.props.setFilters(filters , 'scout');
    }

    clearName = () => {
        this.setState({name : ''}, () => {
            this.makeFilterRequest();
        });
    };

    changeName = (name) => {
        if (name) {
            this.setState({name: name} , () => {
                this.makeFilterRequest();
            })
        }
    };

    filterTeams = (teams) =>  {

        if (this.state.id_league) {
            teams = this.props.teamOptions.filter(i => i.item.id_league === parseInt(this.state.id_league));
        }
        else if (this.state.id_level) {
            let leagues = this.props.leagueOptions.filter(i => i.item.id_level == this.state.id_level)
                .map(i => parseInt(i.item.id));
            teams = teams.filter(t => leagues.indexOf(t.item.id_league) !== -1 );
        }

        return teams;
    };

    changeLeague = (league , level) => {
        this.setState({id_league : league , id_team_current: '' , id_level : level} , () => {
            this.makeFilterRequest();
        });
    };

    clearLeague = () => {
        this.setState({id_league : '' , dropdownLeagues: []  , id_level : ''} , () => {
            this.makeFilterRequest();
        });
    };



    render() {
        const {classes, width} = this.props;

        return ( <div className={classes.row}>

            <Grid container gutter={40}>
                <Grid item xs={12} sm={6} md={4}>
                    <DropdownOptions  fullWidth
                                      options={[]}
                                      value={1}
                                      label="League"
                                      levels={this.props.levels}
                                      levelOptions={this.props.levelOptions && this.props.levelOptions.length > 0 ? this.props.levelOptions: []}
                                      leaguesOptions={this.props.leagueOptions}
                                      leagues={this.props.leagues}
                                      changeLeague={this.changeLeague}
                                      clearLeague={this.clearLeague}
                                      league={parseInt(this.state.id_league) || this.state.id_league_save ||  ''}
                                      level={this.state.id_level || ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Autosuggest fullWidth
                                 label="Team"
                                 value={this.props.teams && this.state.id_team_current ? this.props.teams[this.state.id_team_current] || '' : ''}
                                 suggestions={this.filterTeams(this.props.teamOptions) }
                                 onSuggestionSelected={this.onChangeAutosuggest('id_team_current')}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>

                    <Hidden xsDown>
                        <TextField
                            id="name"
                            label="Name"
                            value={this.state.name ||  ''}
                            className={ classes.textField }
                            onChange={this.onChangeName}
                        />
                    </Hidden>

                    <Hidden smUp>
                        <InputText options={[]}
                                   value={1}
                                   label="Name"
                                   changeName={this.changeName }
                                   name={this.state.name}
                                   clearName={this.clearName}
                        />
                    </Hidden>

                </Grid>

                <Hidden smUp>
                    <div className={classes.buttonViewContainer}>
                        <Button raised color="primary" className={classes.viewButton} onClick={this.props.viewResults}>
                            <Typography className={classes.viewTypography}>
                                view all {this.props.total} scouts
                            </Typography>
                        </Button>
                    </div>
                </Hidden>

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