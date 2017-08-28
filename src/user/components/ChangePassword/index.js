/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles, createStyleSheet} from 'material-ui/styles';

import {PLAYER_ROLE, SCOUT_ROLE} from '../../constants';


const styleSheet = createStyleSheet('ChangePassword', theme => ({}));


class ChangePassword extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return <div>ChangePassword</div>
    }
}

ChangePassword.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ChangePassword);