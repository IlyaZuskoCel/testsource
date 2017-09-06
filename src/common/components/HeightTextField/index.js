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


const parse = value => {
    if (!value) return {
        f: '',
        i: '',
    };
    return {
        f: value[0] || '',
        i: value[1] || '',
    }

};

const get = ({f, i}) => {
    return [f, i];
};

const styleSheet = createStyleSheet('HeightTextField', theme => {

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


class HeightTextField extends Component {
    constructor(props) {
        super(props);

        this.state = {focused: false};
    }

    handleChange = name => event => {
        event.preventDefault();

        let data = parse(this.props.value);

        data[name] = event.target.value;

        const dataValue = get(data);

        this.props.onChange({target: {value: dataValue}});
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

        const data = parse(value);
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
                            shrink={!!data.f || !!data.i || this.state.focused}>
                    {label}
                </InputLabel>}

                <Input
                    className={classNames(classes.input, classes.leftInput, {[classes.hidePlaceholder]: data.f || (!this.state.focused && !data.f && !data.i)})}
                    disabled={disabled}
                    name="f"
                    value={data.f}
                    placeholder="ft"
                    onChange={this.handleChange('f')}
                />

                <Input
                    className={classNames(classes.input, classes.rightInput, {[classes.hidePlaceholder]: data.i || (!this.state.focused && !data.f && !data.i)})}
                    disabled={disabled}
                    name="i"
                    value={data.i}
                    placeholder="in"
                    onChange={this.handleChange('i')}

                />

                {helperText &&
                <FormHelperText className={helperTextClassName} {...FormHelperTextProps}>
                    {helperText}
                </FormHelperText>}
            </FormControl>

        );
    }
}

HeightTextField.defaultProps = {
    required: false,
};

export default withStyles(styleSheet)(HeightTextField);