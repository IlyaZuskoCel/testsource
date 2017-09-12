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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    }

    changeName(event) {
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

        let options = {

            id_league: this.state.id_league ? this.state.id_league : null,
            id_team_current: this.state.id_team_current ? this.state.id_team_current : null,
            'name_search': this.state.name ? this.state.name : null,
        };


        if (this.state.name || this.state.id_league || this.state.id_team_current) {
            queryString += '?';

            for (let key in options) {
                if (options[key] === null)
                    continue;

                queryString += key + '=' + options[key] + '&'
            }
        }

        this.props.filterScouts(queryString.slice(0, -1));
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


    render() {
        const {classes, width} = this.props;

        return ( <div className={classes.row}>

            <Grid container gutter={40}>
                <Grid item xs={12} sm={6} md={4}>
                    <Autosuggest fullWidth
                                 label="League"
                                 value={this.props.leagues[this.state.id_league] || this.props.query['id_league'] || ''}
                                 suggestions={this.props.leagueOptions}
                                 onSuggestionSelected={this.onChangeAutosuggest('id_league')}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Autosuggest fullWidth
                                 label="Team"
                                 value={this.props.leagues[this.state.id_team_current] || this.props.query['id_team_current'] || ''}
                                 suggestions={this.state.id_league ? this.props.teamOptions.filter(i => i.item.id_league === parseInt(this.state.id_league)) : this.props.teamOptions}
                                 onSuggestionSelected={this.onChangeAutosuggest('id_team_current')}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>

                    <Hidden xsDown>
                        <TextField
                            id="name"
                            label="Name"
                            value={this.state.name || this.props.query['name_search'] || ''}
                            className={width === 'xl' || width === 'lg' || width === 'md' ? classes.textField : classes.mobileTextField}
                            onChange={this.onChangeName}
                        />
                    </Hidden>

                    <Hidden smUp>
                        <InputText options={[]}
                                   value={1}
                                   label="Name"
                                   changeName={this.changeName }
                                   name={this.state.name || this.props.query['name_search'] }
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