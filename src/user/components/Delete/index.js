/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles, createStyleSheet} from 'material-ui/styles';

import {PLAYER_ROLE, SCOUT_ROLE} from '../../constants';


const styleSheet = createStyleSheet('Delete', theme => ({}));


class Delete extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return <div>Delete</div>
    }
}

Delete.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Delete);