/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';


import {Link, Autosuggest} from '../../../common/components';

import {PLAYER_ROLE, SCOUT_ROLE} from '../../constants';


import defaultPhoto from './assets/images/default-photo.png';

import PlayerForm from '../../containers/EditPlayerForm';
import ScoutForm from '../../containers/EditScoutForm';

const styleSheet = createStyleSheet('Edit', theme => ({
    root: {
        width: '100%',
        maxWidth: 1168,
        margin: 'auto',
        marginTop: 56,
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 16,
            paddingRight: 16,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
            width: 'auto',
        },
    },
    content: {
        paddingTop: 32,
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },

    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
        },
    },
    pictureWrap: {
        width: 270,
        height: 280,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',

        [theme.breakpoints.down('sm')]: {
            height: 72,
            width: 72,
        },
    },
    pictureDefaultWrap: {
        justifyContent: 'center',
    },
    picture: {
        maxWidth: 270,
        maxHeight: 270,
        [theme.breakpoints.down('sm')]: {
            height: 72,
            width: 72,
        },
    },
    pictureDefault: {
        width: 176,
        [theme.breakpoints.down('sm')]: {
            width: 72,
        },
    },
    pictureLinks: {
        display: 'flex',
        flexDirection: 'column',
    },
    link: {
        color: '#eb3941',
        cursor: 'pointer',
        textDecoration: 'underline',
        marginTop: 24,
        [theme.breakpoints.down('sm')]: {
            marginTop: 8,
            marginLeft: 24,
        },
    },
    uploadWrap: {
        position: 'relative'
    },
    uploadInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0,
        cursor: 'pointer',
    },
    formWrap: {
        marginLeft: 88,
        paddingBottom: 96,
        [theme.breakpoints.down('md')]: {
            marginLeft: 40,
            marginRight: 40,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 0,
            marginTop: 40,
            paddingBottom: 40,
        },
        width: '100%',
        maxWidth: 688
    }

}));


class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getUser();
    }

    onUploadPicture = event => {
        event.preventDefault();
        if (!event.target.files.length) return;

        this.props.uploadPicture(event.target.files[0]);

    };
    onDeletePicture = event => {
        event.preventDefault();
        this.props.uploadPicture(null);
    };


    render() {
        const {classes, user} = this.props;

        // const Form = PlayerForm;

        return <div className={classes.root}>

            <Hidden xsDown>
                <Typography type="headline">Edit Profile</Typography>
            </Hidden>
            <div className={classes.content}>
                <div className={classes.left}>

                    <div
                        className={classNames(classes.pictureWrap, {[classes.pictureDefaultWrap]: !user.profile_picture})}>
                        <img
                            className={classNames(classes.picture, {[classes.pictureDefault]: !user.profile_picture})}
                            src={user.profile_picture || defaultPhoto}/>

                    </div>

                    <div className={classes.pictureLinks}>
                        <Typography type="body1" className={classNames(classes.link, classes.uploadWrap)}>
                            Update profile picture
                            <input autoComplete="off" type="file" onChange={this.onUploadPicture}
                                   className={classes.uploadInput}/>
                        </Typography>
                        <Typography type="body1" onClick={this.onDeletePicture} className={classes.link}>
                            Delete profile picture
                        </Typography>

                    </div>
                </div>
                {this.props.user.role === SCOUT_ROLE && (
                    <ScoutForm className={classes.formWrap}/>
                )}
                {this.props.user.role === PLAYER_ROLE && (
                    <PlayerForm className={classes.formWrap}/>
                )}

            </div>
        </div>
    }
}

Edit.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};


export default compose(withStyles(styleSheet), withWidth())(Edit);