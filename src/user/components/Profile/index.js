/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles, createStyleSheet} from 'material-ui/styles';

import {PLAYER_ROLE, SCOUT_ROLE} from '../../constants';


import PlayerProfile from './player';
import ScoutProfile from './scout';

const styleSheet = createStyleSheet('Profile', theme => ({
}));


class Profile extends Component {
    componentDidMount() {
        const id = this.props.currentUser.id;
        this.props.getUser(id);
    }

    render() {
        if (!this.props.user)
            return null;

        if( this.props.user.role === SCOUT_ROLE)
            return <ScoutProfile {...this.props} />;
        else
            return <PlayerProfile {...this.props}/>;
    }
}

Profile.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Profile);