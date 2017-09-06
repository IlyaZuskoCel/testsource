import React, {Component} from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import withWidth from 'material-ui/utils/withWidth';


import {withStyles, createStyleSheet} from 'material-ui/styles';

const styleSheet = createStyleSheet('Shortlist' , theme => ({

}));


class Shortlist extends Component {
    render() {
        return (<div>Hello I'm a short list</div>);
    }
}

Shortlist.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string,
};

export default compose(withStyles(styleSheet), withWidth())(Shortlist);