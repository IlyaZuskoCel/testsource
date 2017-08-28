/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import PlayerForm from './PlayerForm';
import ScoutForm from './PlayerForm';
import Typography from 'material-ui/Typography';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Radio from 'material-ui/Radio';

const styleSheet = createStyleSheet('Register', theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,

    },
    iam: {
        display: 'inline',
        marginLeft: 8,
    },
    radio_buttons_group: {
        display: 'inline-block',
        top: 11,
    },
    role:{
        width: 20,
        height: 20,
        [theme.breakpoints.down('sm')]:{
            width: 16,
            height: 16,
        },
    },
    agent: {
        display: 'flex',
        marginTop: 72,
        marginLeft: 48,
        height: 0,
    },
    player_label: {
        marginLeft: 16,
        marginTop: 8,

    },
}));

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            username: '',
            password: '',
            errors: [],

        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getLeagues();
        this.props.getTeams();
    }

    handleChange(name) {
        return event => this.setState({[name]: parseInt(event.target.value)});
    }

    render() {
        const classes = this.props.classes;
        //console.log('props of Register',this.props.logIn);
        return (
            <div className={classes.root}>
                <div className={classes.agent}>
                    <Typography type="subheading" className={classes.iam}>I am a</Typography>
                    <FormGroup className={classes.radio_buttons_group}>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={this.state.index === 0}
                                    onChange={this.handleChange('index')}
                                    value="0"
                                    className={classes.role}
                                />
                            }
                            label="Player"
                            className={classes.player_label}
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={this.state.index === 1}
                                    onChange={this.handleChange('index')}
                                    value="1"
                                    className={classes.role}
                                />
                            }
                            label="Scout"
                        />
                    </FormGroup>
                </div>
                {this.state.index === 0 && <PlayerForm onSubmit={this.props.registerPlayer}
                                                       leagues={this.props.leagues}
                                                       teams={this.props.teams}
                                                       index={this.state.index}
                />}
                {this.state.index === 1 && <ScoutForm onSubmit={this.props.registerScout}
                                                      leagues={this.props.leagues}
                                                      teams={this.props.teams}
                                                      index={this.state.index}
                />}
            </div>);
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Register);