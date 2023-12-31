/**
 * Created by aleksandr on 8/22/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';


import Icon from 'material-ui/Icon';

const styleSheet = createStyleSheet('Pagination', (theme) => ({
    root: {},
    button: {
        [theme.breakpoints.up('md')]: {
            width: 'auto',
            minWidth: 24,
            marginLeft: 4,
            marginRight: 4,
            paddingLeft: 0,
            paddingRight: 0,
            '&:hover': {
                borderBottom: 'solid 3px #d7001e',
                backgroundColor: 'transparent'
            }
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
        }
    },
    current: {
        borderBottom: 'solid 3px #d7001e',
        color: '#d7001e'
    },
    points: {
        ...theme.typography.button,
        marginLeft: 4,
        marginRight: 4,
    }
}));

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {};


    }

    onChange = (page) => (e) => {
        e.preventDefault();
        this.props.onChange(page);
        return false;
    };



    render() {
        const {currentPage, total, perPage, classes, width} = this.props;

        const countPages = Math.ceil(total / perPage);
        const smallWidth = width === 'sm'|| width === 'xs';

        if (smallWidth) {
            return (
                <Grid container>
                    {currentPage > 1 && (
                        <Grid item xs={currentPage < countPages ? 6 : 12}>
                            <Button onClick={this.onChange(currentPage - 1)} raised className={classes.button}>
                                <Icon>keyboard_arrow_left</Icon>
                                previous</Button>
                        </Grid>
                    )}

                    {currentPage < countPages && (
                        <Grid item xs={currentPage > 1 ? 6 : 12}>
                            <Button onClick={this.onChange(currentPage + 1)} raised
                                    className={classes.button}>next<Icon>keyboard_arrow_right</Icon></Button>
                        </Grid>
                    )}
                </Grid>
            )
        }

        return (
            <div>
                {(currentPage > 2) && (
                    <Button onClick={this.onChange(1)} className={classes.button}>1</Button>
                )}
                {currentPage > 3 && (<span className={classes.points}>...</span>)}


                {currentPage > 2 && currentPage === countPages && countPages > 3 && (
                    <Button onClick={this.onChange(currentPage - 2)}
                            className={classes.button}>{currentPage - 2}</Button>
                )}

                {currentPage > 1  && (
                    <Button onClick={this.onChange(currentPage - 1)}
                            className={classes.button}>{currentPage - 1}</Button>
                )}
                <Button onClick={this.onChange(currentPage)}
                        className={classNames(classes.button, classes.current)}>{currentPage}</Button>

                {currentPage < countPages && (
                    <Button onClick={this.onChange(currentPage + 1)}
                            className={classes.button}>{currentPage + 1}</Button>
                )}
                {currentPage === 1 && countPages > 3 && (
                    <Button onClick={this.onChange(currentPage + 2)}
                            className={classes.button}>{currentPage + 2}</Button>
                )}


                {currentPage <= countPages - 3 && (<span className={classes.points}>...</span>)}

                {currentPage <= countPages - 2 && (
                    <Button onClick={this.onChange(countPages)} className={classes.button}>{countPages}</Button>
                )}
            </div>
        )
    }
}

Pagination.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string,
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number,
    currentPage: PropTypes.number,
    onChange: PropTypes.func

};

export default compose(withStyles(styleSheet), withWidth())(Pagination);