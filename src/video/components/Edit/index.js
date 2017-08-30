/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles, createStyleSheet} from 'material-ui/styles';


const styleSheet = createStyleSheet('Edit', theme => ({}));


class Edit extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        return <h1>Edit</h1>;
    }
}

Edit.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Edit);