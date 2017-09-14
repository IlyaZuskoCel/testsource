/**
 * Created by kirill on 9/11/17.
 * moonion.com
 */

import React, {Component} from 'react';
import classNames from 'classnames';

import Input, {InputLabel} from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import {Autosuggest} from '../../../common/components';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';

import {withStyles, createStyleSheet} from 'material-ui/styles';

import ScoutIcon from '../../../common/components/Icon';

const styleSheet = createStyleSheet('DropDownCheckBoxes', theme => {
    return {
        root: {},
        inputRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: 'solid 1px #cbcbcb'
        },
        icon: {
            cursor: 'pointer',
            marginLeft: -16,
            zIndex: 0,
            lineHeight: '40px'
        },
        container: {
            width: '100%',
            position: 'relative',
        },
        suggestionsContainerOpen: {
            position: 'absolute',
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit * 3,
            left: 0,
            right: 0,
            zIndex: 1000,

            boxSizing: 'border-box',
            padding: [15 , 25],


            [theme.breakpoints.down('sm')]: {
                position: 'fixed',
                left: 0,
                top: 52,
                width: '100%',
                height: '100%',
            }
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
        },
        input: {
            padding: 8,
            marginTop: 16,
            cursor: 'pointer',

        },
        openEmpty: {
            marginTop: 16,
            height: 38
        },
        label: {
            cursor: 'pointer',
        },
        controllBar: {
            display:'flex',
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,


            [theme.breakpoints.down('sm')]: {
                marginTop: 0,
            }
        },
        applyButton: {
            color: '#d7001e',
        },
        cancelButton: {
            color: '#cbcbcb',
            opacity: '0.6',
        }
    }
});


class DropDownCheckBoxes extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        open: false,
        applied: false,
    };

    toggleOpen = () => {
        this.setState({open: !this.state.open});
    };

    componentWillReceiveProps(nextProps) {
        if ('leagues' in nextProps) {
            this.setState({leagues : nextProps.leagues});
        }

        if ('leaguesOptions' in nextProps) {
            this.setState({leaguesOptions : nextProps.leaguesOptions , filteredLeagues : nextProps.leaguesOptions});
        }
    }

    handleChange = value => (event, checked) => {
        if (this.props.value.indexOf(value) > -1)
            return this.props.onChange(this.props.value.filter(v => v !== value));

        return this.props.onChange([...this.props.value, value]);
    };


    handleApply = (event) => {
        this.setState({
            applied: true,
            open: false,
        } , () => {
            this.props.changeLeague(this.state.league_id ? this.state.league_id : '');
        });
    };

    handleCancel = (event) => {
        this.setState({
            level_id: '',
            league_id: '',
            open: false,
        } , () => {
            this.props.clearLeague();
        });
    };

    onChangeLevel =  (event , {suggestionValue}) => {
        let leagues = suggestionValue ? this.state.leaguesOptions.filter(league => parseInt(league.item.id_level) === suggestionValue ) : this.state.leaguesOptions;
        this.setState({'level_id': suggestionValue , filteredLeagues: leagues});
    };

    onChangeLeague = (event, {suggestionValue}) => {
        this.setState({'league_id' : suggestionValue});
    };

    render() {
        const {
            classes,
            error,
            className,
            fullWidth,
            required,
            options,
            value,
            label,
            labelClassName,
            InputLabelProps,
            helperTextClassName,
            FormHelperTextProps,
            helperText,
            id,
            levels,
            levelOptions,
            leaguesOptions,
            leagues,
            league,
            getLeagues,
            changeLeague,
            clearLeague,
            ...other
        } = this.props;
        return (
            <div className={classNames(classes.root, className)}>
                <div className={classes.inputRow}>

                    <FormControl
                        fullWidth={fullWidth}
                        error={error}
                        required={required}
                        {...other}>
                        {label && (
                            <InputLabel htmlFor={id}
                                        focused={this.state.open}
                                        shrink={this.state.open || !!value.length || !!this.props.league}
                                        onClick={this.toggleOpen}
                                        className={classNames(classes.label, labelClassName)} {...InputLabelProps}>
                                {label}
                            </InputLabel>
                        )}
                        {(value.length || this.state.open || this.props.league) ? (
                            <Typography type="body2" onClick={this.toggleOpen}
                                        id={id}
                                        className={classes.input}>
                                {this.props.league ? this.props.leagues[this.props.league] : ''}
                            </Typography>
                        ) : (
                            <div className={classes.openEmpty}
                                 id={id}
                                 onClick={this.toggleOpen}/>
                        )}

                        {helperText && (
                            <FormHelperText className={helperTextClassName} {...FormHelperTextProps}>
                                {helperText}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <ScoutIcon className={classes.icon} onClick={this.toggleOpen}>dropdown-arrows</ScoutIcon>
                </div>

                <div className={classes.container}>
                    {this.state.open && <div className={classes.overlay} onClick={this.toggleOpen}/>}
                    {this.state.open &&
                    <Paper style={{zIndex: 1000}} square className={classes.suggestionsContainerOpen}>
                        <Hidden smUp>
                            <div className={classes.controllBar}>
                                <Button onClick={this.handleCancel} className={classes.cancelButton}>Cancel</Button>
                                <Button onClick={this.handleApply} className={classes.applyButton}>Apply</Button>
                            </div>
                        </Hidden>

                        <div className={classes.dropdownItem}>
                            <Autosuggest fullWidth
                                label="Levels" value={this.props.levels ? this.props.levels[this.state.level_id] || '' : ''}
                                         suggestions={this.props.levelOptions}
                                         onSuggestionSelected={this.onChangeLevel}/>
                        </div>

                        <div className={classes.dropdownItem}>
                            <Autosuggest fullWidth
                                         label="League"
                                         value={this.state.league_id ? this.state.leagues[this.state.league_id] : ''}
                                         suggestions={this.state.filteredLeagues ? this.state.filteredLeagues : []}
                                         onSuggestionSelected={this.onChangeLeague}/>
                        </div>

                        <Hidden smDown>
                            <div className={classes.controllBar}>
                                <Button onClick={this.handleCancel}>Cancel</Button>
                                <Button onClick={this.handleApply}>Apply</Button>
                            </div>
                        </Hidden>

                    </Paper>}
                </div>
            </div>

        );
    }
}

DropDownCheckBoxes.defaultProps = {};

export default withStyles(styleSheet)(DropDownCheckBoxes);