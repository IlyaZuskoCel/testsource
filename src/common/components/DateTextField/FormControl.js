/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import { isDirty } from 'material-ui/Input/Input';

const styles = createStyleSheet('FormControl', theme => ({
    root: {
        display: 'inline-flex',
        flexDirection: 'column',
        position: 'relative',
        // Reset fieldset default style
        minWidth: 0,
        padding: 0,
        margin: 0,
        border: 0,
    },
    marginNormal: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
    },
    marginDense: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit / 2,
    },
    fullWidth: {
        width: '100%',
    },
}));



/**
 * Provides context such as dirty/focused/error/required for form inputs.
 */
class FormControl extends Component {

    static defaultProps = {
        classes: {},
        component: 'div',
        disabled: false,
        error: false,
        fullWidth: false,
        margin: 'none',
        required: false,
    };

    static childContextTypes = {
        muiFormControl: PropTypes.object.isRequired,
    };

    state = {
        dirty: true,
        focused: false,
    };

    getChildContext() {
        const { disabled, error, required, margin } = this.props;
        const { dirty, focused } = this.state;

        return {
            muiFormControl: {
                dirty,
                disabled,
                error,
                focused,
                margin,
                required,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
            },
        };
    }


    handleFocus = event => {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
        if (!this.state.focused) {
            this.setState({ focused: true });
        }
    };

    handleBlur = event => {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
        if (this.state.focused) {
            this.setState({ focused: false });
        }
    };


    render() {
        const {
            children,
            classes,
            className,
            component: ComponentProp,
            disabled,
            error,
            fullWidth,
            margin,
            ...other
        } = this.props;

        return (
            <ComponentProp
                className={classNames(
                    classes.root,
                    {
                        [classes.marginNormal]: margin === 'normal',
                        [classes.marginDense]: margin === 'dense',
                        [classes.fullWidth]: fullWidth,
                    },
                    className,
                )}
                {...other}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            >
                {children}
            </ComponentProp>
        );
    }
}

export default withStyles(styles)(FormControl);