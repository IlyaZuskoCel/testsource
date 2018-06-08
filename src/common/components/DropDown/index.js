/**
 * Created by aleksandr on 9/6/17.
 * moonion.com
 */

import React, {Component} from 'react';
import classNames from 'classnames';

import Input, {InputLabel} from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

import Typography from 'material-ui/Typography';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import {ListItem} from 'material-ui/List';

import {withStyles, createStyleSheet} from 'material-ui/styles';

import ScoutIcon from '../Icon';

const styleSheet = createStyleSheet('DropDown', theme => {
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
        iconCross: {
            zIndex: 999
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
        listItem: {
            cursor: 'pointer',
        }
    }
});


class DropDown extends Component {
    state = {
        open: false
    };

    toggleOpen = () => {
        this.setState({open: !this.state.open});
    };
    handleChange = value => (event) => {
        this.props.onChange({...event, target: {value}});
        this.toggleOpen();
    };
    handlerClear = (event) => {
        this.props.onChange({...event, target: {value: ''}});
        this.toggleOpen();
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
                                        shrink={this.state.open || !!value}
                                        onClick={this.toggleOpen}
                                        className={classNames(classes.label, labelClassName)} {...InputLabelProps}>
                                {label}
                            </InputLabel>
                        )}
                        {(value || this.state.open) ? (
                            <Typography type="body2" onClick={this.toggleOpen}
                                        id={id}
                                        className={classes.input}>{value}</Typography>
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
                    <ScoutIcon
                        onClick={this.state.open && !required ? this.handlerClear : this.toggleOpen}
                        className={classNames(classes.icon, {[classes.iconCross]: this.state.open && !required})}>
                        {this.state.open && !required ? 'cross' : 'dropdown-arrows'}
                    </ScoutIcon>
                </div>

                <div className={classes.container}>
                    {this.state.open && <div className={classes.overlay} onClick={this.toggleOpen}/>}
                    {this.state.open &&
                    <Paper style={{zIndex: 1000}} square className={classes.suggestionsContainerOpen}>
                        {options.map(item => (
                            <ListItem component="div"
                                      className={classes.listItem}
                                      key={item.label}
                                      onClick={this.handleChange(item.value)}>
                                <Typography type="body1">{item.label}</Typography>
                            </ListItem>
                        ))}
                    </Paper>}
                </div>
            </div>

        );
    }
}

DropDown.defaultProps = {
    required: false
};

export default withStyles(styleSheet)(DropDown);