/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import Input, {InputLabel} from 'material-ui/Input';
import FormControl from './FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';
import classNames from 'classnames';

import {withStyles, createStyleSheet} from 'material-ui/styles';


const parseDate = value => {
    if (!value) return {
        year: '',
        month: '',
        day: '',
    };
    let date = value.split('-');
    return {
        year: parseInt(date[0]) || '',
        month: parseInt(date[1]) || '',
        day: parseInt(date[2]) || '',
    }

};

const getDate = ({year, month, day}) => {
    return `${year}-${month}-${day || '01'}`;
};

const styleSheet = createStyleSheet('DateTextField', theme => {

    const placeholderForm = {
        opacity: '0 !important',
        transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.ease,
        }),
    };
    const placeholderFormFocus = {
        opacity: '1 !important',
    };

    return {
        root: {
            flexDirection: 'row'
        },
        input: {
            marginTop: 16,
            width: '50%',
            '& > input::-webkit-input-placeholder': placeholderFormFocus,
            '& > input::-moz-placeholder': placeholderFormFocus, // Firefox 19+
            '& > input:-ms-input-placeholder': placeholderFormFocus, // IE 11
            '& > input::-ms-input-placeholder': placeholderFormFocus, // Edge
        },
        leftInput: {
            marginRight: 8,
        },
        rightInput: {
            marginLeft: 8,
        },
        hidePlaceholder: {
            '& > input::-webkit-input-placeholder': placeholderForm,
            '& > input::-moz-placeholder': placeholderForm, // Firefox 19+
            '& > input:-ms-input-placeholder': placeholderForm, // IE 11
            '& > input::-ms-input-placeholder': placeholderForm, // Edge
        }
    }
});


class DateTextField extends Component {
    constructor(props) {
        super(props);

        this.state = {focused: false};
    }

    handleChangeMonth = event => {
        event.preventDefault();
        let value = parseInt(event.target.value);
        if (value > 12 || value < 0)
            return false;

        let date = parseDate(this.props.value);

        date.month = `${value < 10 ? '0' : ''}${value}`;

        const dateValue = getDate(date);

        if (dateValue === this.props.value)
            return;
        this.props.onChange({target: {value: dateValue}});
        return false;
    };
    handleChangeYear = event => {
        event.preventDefault();
        let value = parseInt(event.target.value);
        if (value > 2100 || value < 0)
            return false;

        let date = parseDate(this.props.value);

        date.year = '' + value;

        const dateValue = getDate(date);

        if (dateValue === this.props.value)
            return;
        this.props.onChange({target: {value: dateValue}});
        return false;
    };
    handleFocus = event => {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
        if (!this.state.focused) {
            this.setState({focused: true});
        }
    };

    handleBlur = event => {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
        if (this.state.focused) {
            this.setState({focused: false});
        }
    };



    render() {
        const {
            classes,
            className,
            disabled,
            error,
            id,
            label,
            labelClassName,
            InputLabelProps,
            helperText,
            helperTextClassName,
            FormHelperTextProps,
            fullWidth,
            required,
            rootRef,
            value,
        } = this.props;

        const date = parseDate(value);
        return (
            <div>
                <FormControl
                    fullWidth={fullWidth}
                    ref={rootRef}
                    className={classNames(classes.root, className)}
                    error={error}
                    required={required}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                >
                    {label &&
                    <InputLabel className={labelClassName} {...InputLabelProps}
                                shrink={!!date.month || !!date.year || this.state.focused}>
                        {label}
                    </InputLabel>}

                    <Input
                        className={classNames(classes.input, classes.leftInput, {[classes.hidePlaceholder]: date.month || (!this.state.focused && !date.month && !date.year)})}
                        disabled={disabled}
                        name="month"
                        value={date.month}
                        placeholder="MM"
                        onChange={this.handleChangeMonth}
                    />

                    <Input
                        className={classNames(classes.input, classes.rightInput, {[classes.hidePlaceholder]: date.year || (!this.state.focused && !date.month && !date.year)})}
                        disabled={disabled}
                        name="year"
                        value={date.year}
                        placeholder="YYYY"
                        onChange={this.handleChangeYear}

                    />

                    {helperText &&
                    <FormHelperText className={helperTextClassName} {...FormHelperTextProps}>
                        {helperText}
                    </FormHelperText>}
                </FormControl>

            </div>
        );
    }
}

DateTextField.defaultProps = {
    required: false,
};

export default withStyles(styleSheet)(DateTextField);