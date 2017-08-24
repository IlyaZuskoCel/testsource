/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';


import {Link, Autosuggest} from '../../../common/components';

import {PLAYER_ROLE, SCOUT_ROLE} from '../../constants';


import defaultPhoto from './assets/images/default-photo.png';

import PlayerForm from './player';

const styleSheet = createStyleSheet('Edit', theme => ({
    root: {
        width: '100%',
        maxWidth: 1168,
        margin: 'auto',
        marginTop: 56,
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
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
            height: 192,
            width: 218,
        },
    },
    pictureDefaultWrap: {
        justifyContent: 'center',
    },
    picture: {
        maxWidth: 270,
        maxHeight: 270,
        [theme.breakpoints.down('sm')]: {
            height: 192,
            width: 218,
        },
    },
    pictureDefault: {
        width: 176
    },
    pictureLinks: {
        display: 'flex',
        flexDirection: 'column',
    },
    link: {
        color: '#eb3941',
        cursor: 'pointer',
        textDecoration: 'underline',
        marginTop: 24
    },
    formWrap: {
        marginLeft: 88,
        [theme.breakpoints.down('md')]: {
            marginLeft: 40,
            marginRight: 40,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 0,
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

    };
    onDeletePicture = event => {

    };


    render() {
        const {classes, user} = this.props;

        const Form = PlayerForm;

        return <div className={classes.root}>
            <Typography type="headline">Edit Profile</Typography>
            <div className={classes.content}>
                <div className={classes.left}>

                    <div
                        className={classNames(classes.pictureWrap, {[classes.pictureDefaultWrap]: !user.profile_picture})}>
                        <img
                            className={classNames(classes.picture, {[classes.pictureDefault]: !user.profile_picture})}
                            src={user.profile_picture || defaultPhoto}/>

                    </div>

                    <div className={classes.pictureLinks}>
                        <Typography type="body1" onClick={this.onUploadPicture} className={classes.link}>
                            Update profile picture
                        </Typography>
                        <Typography type="body1" onClick={this.onDeletePicture} className={classes.link}>
                            Delete profile picture
                        </Typography>
                    </div>
                </div>
                <Form className={classes.formWrap}
                      user={user}
                      onSave={this.props.save}
                      onCancel={this.props.cancel}/>
            </div>
        </div>
    }
}

Edit.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Edit);