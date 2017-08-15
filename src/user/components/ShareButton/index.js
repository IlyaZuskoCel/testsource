/**
 * Created by aleksandr on 8/12/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles, createStyleSheet} from 'material-ui/styles';

import {Link, Icon} from '../../../common/components';


const styleSheet = createStyleSheet('ShareButton', theme => ({
    root: {
        textTransform: 'uppercase',
        marginLeft: 48,
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            marginLeft: 16,
        },

    },
    title: {
        marginLeft: 16
    }
}));


class ShareButton extends Component {

    openWindow = () => {

    };

    render() {
        const {classes} = this.props;
        return <Link to="/" onClick={this.openWindow} invert disabledUnderline className={classes.root}>
            <Icon>share</Icon>
           <span className={classes.title}>Share</span></Link>
    }
}

ShareButton.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ShareButton);