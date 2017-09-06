/**
 * Created by aleksandr on 9/6/17.
 * moonion.com
 */

import React, {Component} from 'react';
import classNames from 'classnames';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {ListItem} from 'material-ui/List';

import {withStyles, createStyleSheet} from 'material-ui/styles';

import ScoutIcon from '../Icon';

const styleSheet = createStyleSheet('DropDownCheckBoxes', theme => {
    return {
        root: {},
        inputRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        icon: {
            cursor: 'pointer',
            marginLeft: -16,
            zIndex: 999,
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
            paddingRight: 16,
            cursor: 'pointer',
            outline: 'none',
            color: 'transparent',
            textShadow: '0 0 0 #000'
        },

    }
});


class DropDownCheckBoxes extends Component {
    state = {
        open: false
    };

    toggleOpen = () => {
        this.setState({open: !this.state.open});
    };
    handleChange = value => (event, checked) => {
        if (this.props.value.indexOf(value) > -1)
            return this.props.onChange(this.props.value.filter(v => v !== value));

        return this.props.onChange([...this.props.value, value]);

    };

    render() {
        const {
            classes,
            className,
            inputProps,
            suggestions,
            value,
        } = this.props;
        const other = inputProps.InputProps || {};
        return (
            <div className={classNames(classes.root, className)}>
                <div className={classes.inputRow}>

                    <TextField
                        {...inputProps}
                        InputProps={{
                            classes: {
                                input: classes.input,
                            },
                            ...other,
                        }}
                        onFocus={this.toggleOpen}
                    />
                    <ScoutIcon className={classes.icon} onClick={this.toggleOpen}>dropdown-arrows</ScoutIcon>
                </div>
                <div className={classes.container}>
                    {this.state.open && <div className={classes.overlay} onClick={this.toggleOpen}/>}
                    {this.state.open &&
                    <Paper style={{zIndex: 1000}} square className={classes.suggestionsContainerOpen}>
                        {suggestions.map(item => (
                            <ListItem component="div" key={item.value || item.label}>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={value.indexOf(item.value || item.label) > -1}
                                                  onChange={this.handleChange(item.value || item.label)}
                                                  value={item.label}
                                        />
                                    }
                                    label={item.label}
                                />


                            </ListItem>
                        ))}
                    </Paper>}
                </div>
            </div>

        );
    }
}

DropDownCheckBoxes.defaultProps = {};

export default withStyles(styleSheet)(DropDownCheckBoxes);