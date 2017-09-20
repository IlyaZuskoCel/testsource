/**
 * Created by kirill on 9/12/17.
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

import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';


import {withStyles, createStyleSheet} from 'material-ui/styles';

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
        formControl: {
          width: '100%',
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
        cancleButton: {
            color: '#cbcbcb',
            opacity: '0.6',
        }

    }
});

class DropDownCheckBoxes extends Component {
    state = {
        open: false,
        nameSearch: '',
    };

    toggleOpen = () => {
        this.setState({open: !this.state.open});
    };
    handleChange = value => (event, checked) => {
        if (this.props.value.indexOf(value) > -1)
            return this.props.onChange(this.props.value.filter(v => v !== value));

        return this.props.onChange([...this.props.value, value]);

    };

    onChangeName = (event) => {
      this.setState({nameSearch : event.target.value});
    };

    handleCancle = (event) => {
        this.setState({nameSearch: '' , open: false} , () => {
            this.props.clearName();
        });
    };

    handleApply = (e) => {
        this.setState({
            open: false,
        } , () => {

            this.props.changeName(this.state.nameSearch);
        });
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
            changeName,
            clearName,
            ...other
        } = this.props;
        return (
            <div className={classNames(classes.root, className)}>
                <div className={classes.inputRow}>

                    <FormControl
                        fullWidth={fullWidth}
                        error={error}
                        required={required}
                        className={classes.formControl}
                        {...other}>
                        {label && (
                            <InputLabel htmlFor={id}
                                        focused={this.state.open}
                                        shrink={this.state.open || !!value.length || !!this.props.name}
                                        onClick={this.toggleOpen}
                                        className={classNames(classes.label, labelClassName)} {...InputLabelProps}>
                                {label}
                            </InputLabel>
                        )}
                        {(value.length || this.state.open || this.props.name) ? (
                            <Typography type="body2" onClick={this.toggleOpen}
                                        id={id}
                                        className={classes.input}>
                                {this.props.name}
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
                </div>

                <div className={classes.container}>
                    {this.state.open && <div className={classes.overlay} onClick={this.toggleOpen}/>}
                    {this.state.open &&
                    <Paper style={{zIndex: 1000}} square className={classes.suggestionsContainerOpen}>
                            <div className={classes.controllBar}>
                                <Button onClick={this.handleCancle} className={classes.cancleButton}>Cancel</Button>
                                <Button onClick={this.handleApply} className={classes.applyButton}>Apply</Button>
                            </div>

                            <TextField
                                fullWidth
                                id="search_name"
                                label="Name"
                                value={this.state.nameSearch}
                                onChange={this.onChangeName}/>
                    </Paper>}
                </div>
            </div>

        );
    }
}

DropDownCheckBoxes.defaultProps = {};

export default withStyles(styleSheet)(DropDownCheckBoxes);