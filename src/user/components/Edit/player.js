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
import Button from 'material-ui/Button';


import {DateTextField} from '../../../common/components';

const styleSheet = createStyleSheet('Player', theme => ({
    root: {},
    birth: {}
}));


class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.user,
            errors: []
        };
    }

    handleChange = name => event => {
        console.log(name, event.target.value);
        return this.setState({[name]: event.target.value})
    };

    render() {
        const {classes, className} = this.props;

        return <div className={classNames(classes.root, className)}>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        required
                        label="First Name"
                        value={this.state.first_name}
                        onChange={this.handleChange('first_name')}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        required
                        label="Last Name"
                        value={this.state.last_name}
                        onChange={this.handleChange('last_name')}/>
                </Grid>

                <Grid item xs={12} md={6} className={classes.birth}>
                    <DateTextField required
                                   fullWidth
                                   error={this.state.errors.indexOf('birthday') > -1}
                                   label="Date of Birth"
                                   value={this.state.birthday}
                                   onChange={this.handleChange('birthday')}/>

                </Grid>


            </Grid>
        </div>
    }
}

Player.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Player);