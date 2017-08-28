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
    const {classes, value, label, ref, ...other} = inputProps;

    return (
        <TextField
            className={classes.textField}
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
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        maxHeight: 240,
        overflowX: 'scroll',
        listStyleType: 'none',
    },
    textField: {
        width: '100%',

    },
    input: {
        maxWidth: 266,
    },
    icon: {
        marginLeft: -16
    }
}));

class IntegrationAutosuggest extends Component {


    render() {
        const {classes, inputProps, className, ...props} = this.props;

        return (
            <div className={classNames(classes.root, className)}>
                <Autosuggest
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderInputComponent={renderInput}
                    renderSuggestionsContainer={renderSuggestionsContainer}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    shouldRenderSuggestions={shouldRenderSuggestions}
                    focusInputOnSuggestionClick={false}
                    inputProps={{
                        classes,
                        ...inputProps
                    }}
                    {...props}
                />
                <ScoutIcon className={classes.icon}>dropdown-arrows</ScoutIcon>
            </div>
        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(IntegrationAutosuggest);