/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import Input, {InputLabel} from 'material-ui/Input';
import FormControl from './FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';
import classNames from 'classnames';

import moment from 'moment';

import {withStyles, createStyleSheet} from 'material-ui/styles';


const parseDate = value => {
    if (!value) return {
        year: '',
        month: '',
        day: '',
    };
    let date = value.split('-');
    return {
        year: date[0] || '',
        month: date[1] || '',
        day: date[2] || '',
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
        const date = parseDate(props.value);
        this.state = {
            month: date.month || '',
            year: date.year || '',
            focused: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value === nextProps.value)
            return false;
        let state = {};
        const date = parseDate(nextProps.value);


        if (parseInt(date.month) !== parseInt(this.state.month) && parseInt(date.month) !== 0)
            state.month = date.month || '';

        if (parseInt(date.year) !== parseInt(this.state.year) && parseInt(date.year) !== 0)
            state.year = date.year || '';

        this.setState(state);


    }

    handleChangeMonth = event => {
        event.preventDefault();
        if (event.target.value.length > 2) return false;
        if (event.target.value.length > 0 && ['0', '1'].indexOf(event.target.value[0]) === -1) return false;
        if (event.target.value.length > 1 && event.target.value[0] === '0' && event.target.value[1] === '0' ) return false;
        if (event.target.value.length > 1 && event.target.value[1] === '.') return false;

        let value = parseInt(event.target.value);
        if (value > 12 || value < 0)
            return false;

        if (event.target.value !== '' && (isNaN(value) || isNaN(event.target.value)))
            return false;

        this.setState({month: event.target.value}, () => {
            let date = parseDate(this.props.value);

            if (isNaN(value))
                value = 0;

            date.month = ('00' + value).slice(-2);
            const dateValue = getDate(date);

            if (dateValue === this.props.value)
                return;
            this.props.onChange({target: {value: dateValue}});
        });


        return false;
    };
    handleChangeYear = event => {
        event.preventDefault();

        if (event.target.value.length > 4) return false;

        if (event.target.value.length > 0 && event.target.value[0] === '0') return false;
        if (event.target.value.length > 1 && (event.target.value[1] === '.' || event.target.value[2] === '.' || event.target.value[3] === '.')) return false;

        let value = parseInt(event.target.value);

        if (value < 0)
            return false;

        if (event.target.value !== '' && (isNaN(value) || isNaN(event.target.value)))
            return false;

        this.setState({year: event.target.value}, () => {
            let date = parseDate(this.props.value);

            if (isNaN(value))
                value = 0;

            date.year = ('0000' + value).slice(-4);

            const dateValue = getDate(date);

            if (dateValue === this.props.value)
                return;
            this.props.onChange({target: {value: dateValue}});
        });


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
        } = this.props;


        return (
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
                            shrink={!!this.state.month || !!this.state.year || this.state.focused}>
                    {label}
                </InputLabel>}

                <Input
                    className={classNames(classes.input, classes.leftInput, {[classes.hidePlaceholder]: this.state.month || (!this.state.focused && !this.state.month && !this.state.year)})}
                    disabled={disabled}
                    name="month"
                    value={this.state.month}
                    placeholder="MM"
                    onChange={this.handleChangeMonth}
                />

                <Input
                    className={classNames(classes.input, classes.rightInput, {[classes.hidePlaceholder]: this.state.year || (!this.state.focused && !this.state.month && !this.state.year)})}
                    disabled={disabled}
                    name="year"
                    value={this.state.year}
                    placeholder="YYYY"
                    onChange={this.handleChangeYear}

                />

                {helperText &&
                <FormHelperText className={helperTextClassName} {...FormHelperTextProps}>
                    {helperText}
                </FormHelperText>}
            </FormControl>

        );
    }
}

DateTextField.defaultProps = {
    required: false,
};

export default withStyles(styleSheet)(DateTextField);