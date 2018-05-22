/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import warning from 'warning';
import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
function capitalizeFirstLetter(string) {
    warning(
        typeof string === 'string',
        'Material-UI: capitalizeFirstLetter(string) expects a string argument.',
    );

    return string.charAt(0).toUpperCase() + string.slice(1);
}

const styleSheet = createStyleSheet('Hidden', theme => {
    const hidden = {
        display: 'none',
    };

    return theme.breakpoints.keys.reduce((styles, key) => {
        styles[`only${capitalizeFirstLetter(key)}`] = {
            [theme.breakpoints.only(key)]: hidden,
        };
        styles[`${key}Up`] = {
            [theme.breakpoints.up(key)]: hidden,
        };
        styles[`${key}Down`] = {
            [theme.breakpoints.down(key)]: hidden,
        };

        return styles;
    }, {});
});

function HiddenCss(props) {
    const {
        children,
        classes,
        only,
        xsUp,
        smUp,
        mdUp,
        lgUp,
        xlUp,
        xsDown,
        smDown,
        mdDown,
        lgDown,
        xlDown,
        ...other
    } = props;

    warning(
        Object.keys(other).length === 0 ||
        (Object.keys(other).length === 1 && other.hasOwnProperty('ref')),
        `Material-UI: unsupported properties received ${JSON.stringify(other)} by \`<Hidden />\`.`,
    );

    const className = [];

    for (let i = 0; i < breakpoints.length; i += 1) {
        const breakpoint = breakpoints[i];
        const breakpointUp = props[`${breakpoint}Up`];
        const breakpointDown = props[`${breakpoint}Down`];

        if (breakpointUp) {
            className.push(classes[`${breakpoint}Up`]);
        }
        if (breakpointDown) {
            className.push(classes[`${breakpoint}Down`]);
        }
    }

    if (only) {
        const onlyBreakpoints = Array.isArray(only) ? only : [only];
        onlyBreakpoints.forEach(breakpoint => {
            className.push(classes[`only${capitalizeFirstLetter(breakpoint)}`]);
        });
    }


    if (!React.isValidElement(children)) {
        return null;
    }

    return React.cloneElement(children, {
        className: classNames(children.props.className, className.join(' ')),
    });
}

export default withStyles(styleSheet)(HiddenCss);

