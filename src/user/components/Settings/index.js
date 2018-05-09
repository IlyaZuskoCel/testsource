/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';

import {PLAYER_ROLE, SCOUT_ROLE} from '../../constants';

import PlayerForm from '../../containers/SettingsPlayerForm';
import ScoutForm from '../../containers/SettingsScoutForm';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidMount() {
    //     this.props.getUser();
    // }

    render() {
        if (this.props.user.role === PLAYER_ROLE)
            return <PlayerForm/>;
        if (this.props.user.role === SCOUT_ROLE)
            return <ScoutForm/>;
    }
}

export default Settings;