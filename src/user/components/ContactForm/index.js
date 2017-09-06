/**
 * Created by aleksandr on 8/11/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from 'material-ui/Typography';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import {TextArea} from '../../../common/components';


import {Link} from '../../../common/components';

const styleSheet = createStyleSheet('ContactForm', theme => ({
    contactContainer: {
        padding: 80,
        paddingTop: 0,
    },
    contactTitle: {
        paddingBottom: 40
    },
    contactTextField: {
        marginTop: 24,
        [theme.breakpoints.down('sm')]: {
            marginTop: 8,
        }

    },

    contactButton: {
        marginTop: 64,
        [theme.breakpoints.down('sm')]: {
            marginTop: 40,
            marginBottom: 40,
        }
    },

}));


class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactSubject: '',
            contactMessage: '',
        };
    }

    sendMessage = (e) => {
        e.preventDefault();
        if (!this.props.currentUser.is_verify) return false;
        if (this.props.user.is_messaged > 2) return false;

        if (!this.state.contactSubject) return false;
        if (!this.state.contactMessage) return false;

        this.props.sendEmail(this.props.user.id, this.state.contactSubject, this.state.contactMessage);
        this.setState({
            contactSubject: '',
            contactMessage: ''
        });
        return false;
    };

    handleChange = name => event => this.setState({[name]: event.target.value});


    render() {

        const {classes, currentUser, user} = this.props;

        return <Grid container>
            <Grid item sm={3} xs={12}>


                {!this.props.currentUser.is_verify && (
                    <Typography type="body1">
                        You must be a verified scout before you can contact players.
                        Please go to your <Link to="/settings">Settings</Link> to request to get verified.
                    </Typography>
                )}

                {!!this.props.currentUser.is_verify && !!user.message_date && (
                    <Typography type="caption">
                        You contacted this {user.have_agent ? "player's agent" : "player"}
                        on {moment(user.message_date).format('MMMM Do, YYYY')}.
                    </Typography>
                )}


                {!!this.props.currentUser.is_verify && !!user.have_agent && (
                    <Typography type="body1">
                        <strong>You are contacting this player’s agent.</strong> Responses will
                        be send
                        directly
                        to your email as indicated.
                    </Typography>
                )}


                {!!this.props.currentUser.is_verify && !!!user.have_agent && (
                    <Typography type="body1">
                        You can send a message to a player here. Responses will be send directly
                        to your
                        email as indicated.
                    </Typography>
                )}

            </Grid>
            <Grid item sm={8} xs={12}>
                <form onSubmit={this.sendMessage}>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   type="email"
                                   label="Your Email Address"
                                   value={currentUser.email}
                                   disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   className={classes.contactTextField}
                                   label="Subject Line"
                                   disabled={!this.props.currentUser.is_verify}
                                   value={this.state.contactSubject}
                                   onChange={this.handleChange('contactSubject')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextArea fullWidth
                                  className={classes.contactTextField}
                                  rowsMax="4"
                                  label="Message"
                                  disabled={!this.props.currentUser.is_verify}
                                  value={this.state.contactMessage}
                                  onChange={this.handleChange('contactMessage')}
                        />
                    </Grid>
                    <Grid container align="center" justify="center">
                        <Grid item xs={6}>
                            <Button type="submit"
                                    color={!this.props.currentUser.is_verify || this.props.user.is_messaged > 2 ? 'default' : 'primary'}
                                    raised
                                    disabled={!this.props.currentUser.is_verify || this.props.user.is_messaged > 2}
                                    className={classes.contactButton}>Send</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>


    }
};

ContactForm.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(ContactForm);