/**
 * Created by aleksandr on 8/2/17.
 * moonion.com
 */

import React from 'react';
import classNames from 'classnames';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import {capitalizeFirstLetter} from 'material-ui/utils/helpers';



export const styleSheet = createStyleSheet('MuiIcon', theme => ({
    root: {
        userSelect: 'none',
    },
    colorAccent: {
        color: theme.palette.accent.A200,
    },
    colorAction: {
        color: theme.palette.action.active,
    },
    colorContrast: {
        color: theme.palette.getContrastText(theme.palette.primary[500]),
    },
    colorDisabled: {
        color: theme.palette.action.disabled,
    },
    colorError: {
        color: theme.palette.error.A400,
    },
    colorSuccess: {
        color: theme.palette.primary.A700,
    },
    colorPrimary: {
        color: theme.palette.primary[500],
    },
}));

function Icon(props) {
    const {children, classes, className: classNameProp, color, ...other} = props;

    const className = classNames(
        'icon',
        `icon-${children}`,
        classes.root,
        {
            [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'inherit',
        },
        classNameProp,
    );

    return (
        <span className={className} aria-hidden="true" {...other}/>
    );
}

Icon.defaultProps = {
    color: 'inherit',
};

Icon.muiName = 'Icon';

export default withStyles(styleSheet)(Icon);