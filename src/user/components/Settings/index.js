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

    render() {

        if (this.props.user && this.props.user.role === SCOUT_ROLE)
            return <ScoutForm/>;

        return <PlayerForm/>;
    }
}

export default Settings;