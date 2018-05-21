import React, {Component} from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import withWidth from 'material-ui/utils/withWidth';
import Hidden from 'material-ui/Hidden';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {Icon} from '../../../common/components';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import PlayerCard from "../Cards/PlayerCard";

const styleSheet = createStyleSheet('Shortlist' , theme => ({
    root: {},
    content: {
        maxWidth: 1168,
        width: '100%',
        margin: 'auto',
    },
    containerWrapper: {
        backgroundColor: 'transparent',
        padding: 56,


        [theme.breakpoints.down('md')]: {
          padding: [28 , 0],
        },

        [theme.breakpoints.down('sm')]: {
            padding: [56 , 0],
        }
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        [theme.breakpoints.down('md')]: {
            marginLeft: 20,
        },

        [theme.breakpoints.down('sm')]: {
            width: '100%',
            justifyContent: 'center',
        }
    },
    star: {
        transform: 'scale(1.3)',
        width: 24,
        height: 24,
    },
    total: {
        display: 'flex',
        marginTop: 45,


        [theme.breakpoints.down('md')]: {
          marginLeft: 18,
        },

        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    explanatoryItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        [theme.breakpoints.down('sm')]: {
            marginTop: 22.5,
            padding: [0, 24],
        }
    },

    emptyStar: {
        margin: [0 , 3],
        color: '#9b9b9b',
    },
    resultContainer: {
        padding: [40, 0],

        [theme.breakpoints.down('md')]: {
            padding: [40, 15]
        }
    },
    wholeBackground: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 115,
        zIndex: 5,
        backgroundImage: 'linear-gradient(287deg, #f55e58, #c9011b)',
    },
    mobileHeader: {
        position: 'fixed',
        top: 60,
        left: 0,
        display: 'flex',
        width: '100%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,

    },

    emptyHeader: {
        marginTop: 55,

        [theme.breakpoints.down('md')]: {
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },

        [theme.breakpoints.down('sm')]: {
            marginTop: 45,
        }
    },

    starMobile: {
        color: '#ffffff',
        height: 20,
        marginRight: 10,
    },

    mobileTitle: {
        color: '#ffffff',
    }
}));


class Shortlist extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        return (<div className={classes.root}>
            <div className={classes.containerWrapper}>
                <div className={classNames(classes.content)}>

                    <Hidden smUp>
                        <div className={classes.wholeBackground}></div>
                    </Hidden>

                    <Hidden smUp>
                        <div className={classes.mobileHeader}>
                            <Icon className={classes.starMobile}>star-full</Icon>
                            <Typography type='body2' className={classes.mobileTitle}>My Shortlist</Typography>
                        </div>
                    </Hidden>

                    <Hidden xsDown><div className={classes.header}>
                        <Icon className={classes.star}>star-full</Icon>
                        <Typography type='headline'>My Shortlist</Typography>
                    </div></Hidden>

                    {this.props.results && this.props.results.length === 0 && <div className={classes.emptyHeader}>
                        <Typography type="subheading">Your shortlist is empty</Typography>
                        <div className={classes.explanatoryItem}>
                            <Typography type="caption">Add and remove players to your Shortlist by clicking on the star icon <Icon className={classes.emptyStar}>star-empty</Icon> on players’ profiles.</Typography>
                        </div>
                    </div>}

                    {this.props.results && this.props.results.length > 0 && <div className={classes.total}>
                        <Typography type="caption">{this.props.results ? this.props.results.length : 0} players found</Typography>
                    </div>}


                    <div className={classes.resultContainer}>
                        <Grid container gutter={40}>
                            {this.props.results && this.props.results.map(player => {
                                return <Grid item xs={12} md={6} lg={4} key={player.id}>
                                    <PlayerCard player={player} role={this.props.currentUser ? this.props.currentUser.role : ''}
                                                removeFavorite={this.props.removeFavorite}/>
                                </Grid>
                            })}
                        </Grid>
                    </div>

                </div>
            </div>
        </div>);
    }
}

Shortlist.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string,
};

export default compose(withStyles(styleSheet), withWidth())(Shortlist);