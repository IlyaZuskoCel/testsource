/**
 * Created by aleksandr on 8/28/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Radio, {RadioGroup} from 'material-ui/Radio';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import TextField from 'material-ui/TextField';

import {REPORT_LIST, REPORT_OTHER, REPORT_DEFAULT} from '../../constants';

const styleSheet = createStyleSheet('ReportButton', theme => ({
    root: {
        textTransform: 'uppercase',
        marginLeft: 48,
        [theme.breakpoints.down('md')]: {
            fontSize: 18,
            marginLeft: 16,
        },

    },
    radio: {
        paddingTop: 8,
        paddingBottom: 8
    }
}));


class ReportButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            isOpen: false,
            type: REPORT_DEFAULT,
            message: ''
        };
    }

    handleChange = name => event => {
        return this.setState({[name]: event.target.value})
    };
    handleChangeRadio = name => (event, value) => {
        return this.setState({[name]: value})
    };

    handleOpen = event => {
        event.preventDefault();
        this.setState({isOpen: true});
        return false;
    };
    handleCancel = event => {
        event.preventDefault();
        this.setState({isOpen: false, type: REPORT_DEFAULT, message: '', errors: []});
        this.props.onClose();
        return false;
    };
    handleReport = event => {
        event.preventDefault();


        if (this.state.type === REPORT_OTHER && !this.state.message)
            return this.setState({errors: ['message']});

        this.props.report(this.props.user, this.state.type, this.state.message);
        this.setState({isOpen: false, type: REPORT_DEFAULT, message: '', errors: []});
        this.props.onClose();
        return false;
    };

    render() {
        const {classes, children, username} = this.props;
        return <div>
            <MenuItem onClick={this.handleOpen}>{children}</MenuItem>
            <Dialog
                open={this.state.isOpen}
                ignoreBackdropClick
                ignoreEscapeKeyUp>
                <DialogTitle disableTypography>
                    <Typography type="subheading">
                        Why are you reporting {username}’s profile?
                    </Typography>
                </DialogTitle>
                <DialogContent>

                    <RadioGroup
                        selectedValue={this.state.type}
                        onChange={this.handleChangeRadio('type')}>
                        {Object.keys(REPORT_LIST).map(value => (
                            <FormControlLabel key={value}
                                              value={value}
                                              control={<Radio/>}
                                              label={REPORT_LIST[value]}
                                              className={classes.radio}/>
                        ))}

                    </RadioGroup>

                    <TextField fullWidth
                               error={this.state.errors.indexOf('message') > -1}
                               label="Add details"
                               value={this.state.message}
                               onChange={this.handleChange('message')}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleReport} color="primary">
                        Report
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}

ReportButton.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ReportButton);