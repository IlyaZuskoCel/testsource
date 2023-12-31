/**
 * Created by kirill on 7/21/17.
 * moonion.com
 */

import React, {Component} from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import withWidth from 'material-ui/utils/withWidth';
import classNames from 'classnames';
import Hidden from 'material-ui/Hidden';


import {withStyles, createStyleSheet} from 'material-ui/styles';

import PlayerCard from '../../../user/components/Cards/PlayerCard';

const styleSheet = createStyleSheet('Search', theme => ({
    content: {
        maxWidth: 1168,
        width: '100%',
        margin: 'auto',
    },
    resultContainer: {
        padding: [40, 0],

        [theme.breakpoints.down('md')]: {
            padding: [40, 15]
        }
    },
    resultCard: {
        height: 192,
        transition: theme.transitions.create('box-shadow', {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.ease,
        }),

        [theme.breakpoints.down('md')]: {
            height: 160,
        },

        "&:hover": {
            boxShadow: "0px 3px 14px 0 rgba(0, 0, 0, 0.2)",
        }
    },
    playerInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage: "linear-gradient(to bottom, #f3f3f3, rgba(255, 255, 255, 0.5))",
        height: 150,
        boxSizing: 'border-box',
        padding: [12, 15],
        flex: 1,

        [theme.breakpoints.down('md')]: {
            height: 120,
        }
    },

    leftStripe: {
        float: 'left',
        width: 4,
        height: 192,
        backgroundColor: '#d7001e',

        [theme.breakpoints.down('md')]: {
            height: 162
        },
    },

    playerPhoto: {
        maxWidth: 126,
        maxHeight: 126,

        [theme.breakpoints.down('md')]: {
            maxWidth: 96,
            maxHeight: 96,
        }
    },

    playerNameContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 150,
        // flex: 1,

        [theme.breakpoints.down('md')]: {
            width: 120,
            height: 120,
        }
    },

    nameColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: 126,
        marginLeft: 29,


        [theme.breakpoints.down('lg')]: {
            marginLeft: 5,
        },

        [theme.breakpoints.down('md')]: {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },



    },
    nameFont: {
        fontSize: 40,
        marginTop: 20,

        [theme.breakpoints.down('lg')]: {
            fontSize: 32,
        },

        [theme.breakpoints.down('md')]: {
            marginTop: 0,
        }
    },
    playerLeague: {},

    playerBottomInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#fff',
        padding: [0, 14]
    },

    playerBottomDivider: {
        width: 1,
        height: 18,
        borderLeft: 'solid 1px #cbcbcb',
        margin: [0, 8],
    },

    bottomPlayerText: {
        fontSize: 18,
    },

    lastItemInRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },

    editIcon: {
        fontSize: 18,
        color: '#c2a24d',
    },

    iconWrapper: {
        width: 20,
        height: 19,
    },

    shadowContent: {
        boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.2)',
    },

    playerImage: {
        display: 'flex',
        justifyContent: 'cetner',
        alignItems: 'center',
    },

    total: {
        display: 'flex',

        [theme.breakpoints.down('lg')]: {
          marginLeft: 20,
        },

        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    specificContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    specificText: {
        marginBottom: 20,
    }
}));

class Players extends Component {

    constructor(props) {
        super(props);

        this.state = {
            players: null,
        }
    }

    componentWillReceiveProps(nextProp) {
        this.setState({players: nextProp.players});

    }

    render() {
        const {classes} = this.props;

        return (<div className={classNames(classes.content)}>
                {this.props.currentUser && <div className={classes.total}>
                                                <Typography type="caption">{this.props.total ? this.props.total : 0} player{(this.props.total && this.props.total > 1) ? 's' : ''} found</Typography>
                                           </div>
                }
                <div className={classes.resultContainer}>

                    {this.props.total === 0 && <Hidden only={['md', 'lg', 'xl']}><div className={classes.specificContainer}>
                        <div className={classes.specificText}><Typography type="body2">Your search might be too specific</Typography></div>
                        <div><Typography type="caption">Try reducing the number of filters.</Typography></div>
                    </div></Hidden>}

                    <Grid container gutter={40} justify="center">
                        {this.state.players && this.state.players.map(player => {
                            return <Grid item xs={12} md={6} lg={4} key={player.id}>
                                <PlayerCard player={player}
                                            role={this.props.role}
                                            addFavorite={this.props.addFavorite}
                                            removeFavorite={this.props.removeFavorite}
                                            showPopUp={this.props.showPopUp}
                                            currentUser={this.props.currentUser}/>
                            </Grid>
                        })}
                    </Grid>
                </div>
            </div>
        );
    }
}

Players.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};


export default compose(withStyles(styleSheet), withWidth())(Players);