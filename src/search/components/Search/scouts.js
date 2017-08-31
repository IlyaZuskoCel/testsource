/**
 * Created by kirill on 8/22/17.
 * moonion.com
 */
import React, {Component} from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Tabs, {Tab} from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import withWidth from 'material-ui/utils/withWidth';
import {Link, Icon} from '../../../common/components';
import classNames from 'classnames';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import defaultPhoto from './assets/images/default-photo.png';

const styleSheet = createStyleSheet('Scout', theme => ({
    content: {
        maxWidth: 1168,
        marginTop: 56,
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
        height: 150,

        [theme.breakpoints.down('sm')]: {
            height: 'auto',
            minHeight: 120,
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

        [theme.breakpoints.down('sm')]: {
            height: 'auto',
            minHeight: 120,
        }
    },

    leftStripe: {
        float: 'left',
        width: 4,
        height: 150,
        backgroundColor: '#d7001e',

        [theme.breakpoints.down('sm')]: {
            minHeight: 120,
            maxHeight: 145,
        },
    },

    playerPhoto: {
        width: 126,
        height: 126,

        [theme.breakpoints.down('sm')]: {
            width: 96,
            height: 96,
            justifyContent: 'space-around'
        }
    },

    playerNameContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 150,
        flex: 1,

        [theme.breakpoints.down('sm')]: {
            width: 120,
            height: 'auto',
            minHeight: 120,
        }
    },

    nameColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 150,
        marginLeft: 30,


        [theme.breakpoints.down('sm')]: {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: 120,
            marginLeft: 15,
        }
    },
    nameFont: {
        lineHeight: 1,
        letterSpacing: 0.4,
        textAlign: 'left',

    },

    nameFontFirst: {
        marginTop: 15,

        [theme.breakpoints.down('md')]: {
            marginTop: 10,
        },

    },
    scoutRole: {
        margin: [1, 0, 2, 0],
        lineHeight: 1.33,
    },
    photoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',

        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            height: '100%'
        }
    },
}));

class Scouts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scouts: null,
        }

        this.roleShortener = this.roleShortener.bind(this);
    }

    componentWillReceiveProps(nextProp) {
        this.setState({scouts: nextProp.scouts});
    }


    roleShortener(role) {
        let result;
        if (/\//.test(role)) {
            result = role.split('/')[0];
        }

        return result ? result : role;
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.content}>
                <Typography type="caption">{this.props.total ? this.props.total : 0} scouts found</Typography>
                <div className={classes.resultContainer}>
                    <Grid container gutter={40}>

                        {this.state.scouts && this.state.scouts.map(scout => {
                            return <Grid item xs={12} md={4} sm={6} key={scout.id}>
                                <Link to={`/profile/${scout.id}`} disabledUnderline>
                                    <Paper classes={{root: classes.resultCard}} elevation={1}>
                                        <div className={classes.leftStripe}></div>

                                        <div className={classes.playerInfo}>
                                            <div className={classes.photoContainer}>
                                                <img src={scout.profile_picture || defaultPhoto}
                                                     className={classes.playerPhoto} alt="Player's photo"/>
                                            </div>

                                            <div className={classes.playerNameContainer}>
                                                <div className={classes.nameColumn}>
                                                    <Typography type='title'
                                                                className={classNames(classes.nameFont, classes.nameFontFirst)}>
                                                        {scout.first_name}
                                                    </Typography>
                                                    <Typography type='title' className={classes.nameFont}>
                                                        {scout.last_name}
                                                    </Typography>


                                                    <Typography type="body1"
                                                                className={classes.scoutRole}>{this.roleShortener(scout.user_role) || 'Unknown'}</Typography>
                                                    <Typography type='caption'
                                                                className={classes.playerLeague}>{scout.league || 'Unknown'}</Typography>
                                                </div>
                                            </div>
                                        </div>

                                    </Paper>
                                </Link>
                            </Grid>
                        })}
                    </Grid>
                </div>
            </div>
        )
    }
}

Scouts.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(Scouts);