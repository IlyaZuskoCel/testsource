/**
 * Created by aleksandr on 8/12/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Button from 'material-ui/Button';


import {Icon} from '../../../common/components';

const styleSheet = createStyleSheet('FavoriteButton', theme => ({

    default: {
        backgroundColor: '#ffffff',
        boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.3)',
        minWidth: 208,

        [theme.breakpoints.down('sm')]: {
            padding: 0,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            minWidth: 160,

            '&:hover': {
                backgroundColor: 'transparent',
            }
        },


    },
    active: {
        backgroundImage: 'linear-gradient(104deg, #c39e3d, #ddc674)',


        '&:hover': {
            backgroundImage: 'linear-gradient(284deg, #f55e58, #c9011b)',
        },
        '&:hover $defaultIcon': {
            opacity: 0,
            width: 0
        },
        '&:hover $defaultName:after': {
            content: '"Remove"',

            [theme.breakpoints.down('sm')]: {
               color:'#d7001e',
            },
        },


        [theme.breakpoints.down('sm')]: {
            backgroundImage: 'none',
            '&:hover': {
                backgroundImage: 'none',
            }
        },

    },
    defaultIcon: {
        color: '#c2a24d',
        fontSize: 22,
        marginTop: -4,
        marginRight: 6

    },
    activeIcon: {
        color: '#fff',
        [theme.breakpoints.down('sm')]: {
            color: '#c2a24d',
        },

    },
    defaultName: {
        '&:after': {
            content: '"Shortlist"',
            color: '#c2a24d',

        },
        [theme.breakpoints.down('sm')]: {
            '&:after': {
                color: '#000'
            },
        },
    },
    activeName: {
        '&:after': {
            content: '"Shortlisted"',
            color: '#fff'
        },


        [theme.breakpoints.down('sm')]: {
            '&:after': {
                color: '#000'
            },
        },
    }

}));


const FavoriteButton = ({user, active, classes, remove, add}) => <Button
    onClick={() => {
        active ? remove(user) : add(user)
    }}
    className={classNames(classes.default, {[classes.active]: active})}>
    <Icon className={classNames(classes.defaultIcon, {[classes.activeIcon]: active})}>
        {active ? 'star-full' : 'star-empty'}
    </Icon>
    <span className={classNames(classes.defaultName, {[classes.activeName]: active})}/>
</Button>;


FavoriteButton.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FavoriteButton);