/**
 * Created by aleksandr on 8/10/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {ListItem} from 'material-ui/List';
import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import Typography from 'material-ui/Typography';

import ScoutIcon from '../Icon';

const shouldRenderSuggestions = value => true;

function renderInput(inputProps) {
    const {classes, value, required, label, ref, ...other} = inputProps;
    return (
        <TextField required={required}
                   className={classes.textField}
                   InputClassName={classes.InputClassName}
                   value={value}
                   label={label}
                   inputRef={ref}
                   InputProps={{
                       classes: {
                           input: classes.input,
                       },
                       ...other,
                   }}
        />
    );
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
    return (
        <ListItem selected={isHighlighted} component="div">
            <Typography type="body1">{suggestion.label}</Typography>
        </ListItem>
    );
}

function renderSuggestionsContainer(options) {
    const {containerProps, children} = options;
    return (
        <Paper {...containerProps} style={{zIndex: 1000}} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return typeof(suggestion.value) !== "undefined" ? suggestion.value : suggestion.label;
}


const styleSheet = createStyleSheet(theme => ({
    root: {
        // maxWidth: 286,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        maxHeight: 240,
        overflowX: 'none',
        overflowY: 'scroll',
        listStyleType: 'none',
        cursor: 'pointer'
    },
    textField: {
        width: '100%',

    },
    InputClassName: {
        paddingRight: 24
    },
    input: {
        paddingRight: 16,
        // cursor: 'pointer',
        // outline: 'none',
        // color: 'transparent',
        // textShadow: '0 0 0 #000'
    },
    icon: {
        cursor: 'pointer',
        marginLeft: -16,
        lineHeight: '40px',
        zIndex: -1,
    },
    iconCross: {
        zIndex: 10000
    }
}));

class IntegrationAutosuggest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            value: props.value,
            suggestions: props.suggestions,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({suggestions: nextProps.suggestions, value: nextProps.value})
    }

    handleFocus = () => {
        this.setState({focus: true});
    };
    handleBlur = (event) => {
        setTimeout(() => {
            this.setState({focus: false});
            const inputValue = this.state.value.trim().toLowerCase();
            const item = this.props.suggestions.find(item => item.label.toLowerCase() === inputValue);
            this.props.onSuggestionSelected(event, {suggestionValue: item ? item.value : ''});
        }, 100);

    };

    handleChange = (event, {newValue}) => {
    };
    handlerClear = (event) => {
        this.props.onSuggestionSelected(event, {suggestionValue: ''});
        this.nameInput.focus();
        setTimeout(() => {
            this.setState({focus: true});
        }, 100);

    };

    handleSuggestionsFetchRequested = ({value}) => {
        const inputValue = value.trim().toLowerCase();

        const item = this.props.suggestions.find(item => item.label.toLowerCase() === inputValue);
        if (item) {
            return this.setState({suggestions: this.props.suggestions, value: item.label})
        }

        const inputLength = inputValue.length;
        const suggestions = inputLength === 0 ? this.props.suggestions : this.props.suggestions.filter(item =>
            item.label.toLowerCase().slice(0, inputLength) === inputValue || item.value === '-1'
        );

        this.setState({
            suggestions: suggestions,
            value
        });
    };
    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const {classes, inputProps, className, required, label, ...props} = this.props;
        return (
            <div className={classNames(classes.root, className)}>
                <Autosuggest
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.handleSuggestionsClearRequested}

                    renderInputComponent={renderInput}
                    renderSuggestionsContainer={renderSuggestionsContainer}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    shouldRenderSuggestions={shouldRenderSuggestions}
                    focusInputOnSuggestionClick={false}
                    inputProps={{
                        ...inputProps,
                        inputRef: (input) => {
                            this.nameInput = input;
                        },
                        onClick: this.handleClick,
                        onFocus: this.handleFocus,
                        onBlur: this.handleBlur,
                        onChange: this.handleChange,
                        classes,
                        required,
                        label,
                        value: this.state.value
                    }}
                    {...props}
                    suggestions={this.state.suggestions}
                />
                <ScoutIcon
                    onClick={this.handlerClear}
                    className={classNames(classes.icon, {[classes.iconCross]: this.state.focus})}>
                    {this.state.focus ? 'cross' : 'dropdown-arrows'}
                </ScoutIcon>


            </div>
        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
};

IntegrationAutosuggest.defaultProps = {
    required: false
};

export default withStyles(styleSheet)(IntegrationAutosuggest);