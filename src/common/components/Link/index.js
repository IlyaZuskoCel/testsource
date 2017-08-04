/**
 * Created by aleksandr on 7/28/17.
 * moonion.com
 */

import React from 'react';
import {Link as RouteLink} from 'react-router-dom';
import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';


const styleSheet = createStyleSheet('Link', (theme) => ({
    root: {
        fontSize: 20,
        fontWeight: 900,
        color: '#d7001e',
        textDecoration: 'none',

        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
        },

        '&:hover': {
            textDecoration: 'underline',
        },
    },
    disabled: {
        color: 'rgba(0, 0, 0, 0.3)',
    },
    disabledUnderline: {
        '&:hover': {
            textDecoration: 'none',
        },
    }
}));

const Link = ({children, classes, className, disabled, disabledUnderline, onClick, ...props}) => <RouteLink
    disabled={disabled || false}
    onClick={e => {
        disabled ? e.preventDefault() : onClick && onClick(e)
    }}
    className={classNames(
        classes.root,
        {
            [classes.disabled]: disabled,
            [classes.disabledUnderline]: disabledUnderline,
        },
        className
    )}
    {...props}>{children}</RouteLink>;

export default withStyles(styleSheet)(Link);