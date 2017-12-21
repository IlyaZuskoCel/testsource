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
import Icon from 'material-ui/Icon';
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
        [theme.breakpoints.down('md')]: {
            marginTop: 8,
        }

    },

    contactButton: {
        marginTop: 64,
        [theme.breakpoints.down('md')]: {
            marginTop: 40,
            marginBottom: 40,
        }
    },
    link: {
        color: '#eb3941',
        cursor: 'pointer',
        textDecoration: 'underline',
        textUnderlinePosition:'under',
        [theme.breakpoints.down('md')]: {
            marginBottom: 16
        }

    },
    linkIcon: {
        color: '#eb3941',
        cursor: 'pointer',
        fontSize: 18,
        marginLeft: -14,
        [theme.breakpoints.down('md')]: {
            fontSize: 14
        }
    }

}));


class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactSubject: '',
            contactMessage: '',
            errors: [],
        };
    }

    sendMessage = (e) => {
        e.preventDefault();
        if (!this.props.currentUser.is_verify) return false;
        if (this.props.user.is_messaged > 2) return false;
        if (!this.state.contactSubject && !this.state.contactMessage) {
            this.setState({errors: ['contactSubject', 'contactMessage']});
            return this.props.error('Please enter a Subject Line and a Message before sending your message.');
        }
        if (!this.state.contactSubject) {
            this.setState({errors: ['contactSubject']});
            return this.props.error('Please enter a Subject Line before sending your message.');
        }
        if (!this.state.contactMessage) {
            this.setState({errors: ['contactMessage']});
            return this.props.error('Please enter a Message before sending your message.');
        }


        this.props.sendEmail(this.props.user.id, this.state.contactSubject, this.state.contactMessage);
        this.setState({
            errors: [],
            contactSubject: '',
            contactMessage: ''
        });
        return false;
    };

    handleChange = name => event => this.setState({[name]: event.target.value, errors: [],});


    render() {

        const {classes, currentUser, user} = this.props;

        return <Grid container>

            {!!this.props.currentUser.is_verify && !user.have_agent && user.team_website && [
                <Grid item md={3} xs={12} key="1">
                    <Typography type="body1">
                        Contact this player's coach via the team's website.
                    </Typography>
                </Grid>,
                <Grid item md={8} xs={12} key="2">

                    <Typography type="body1">
                        <a target="_blank"
                           href={user.team_website.indexOf("http") === 0 ? user.team_website : "http://" + user.team_website}
                           className={classes.link}>
                            Team's website &nbsp; &nbsp; &nbsp;
                            <Icon className={classes.linkIcon}>open_in_new</Icon>
                        </a>
                    </Typography>


                </Grid>
            ]}


            <Grid item md={3} xs={12}>


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


                {!!this.props.currentUser.is_verify && !user.have_agent && (
                    <Typography type="body1">
                        You can {user.team_website && 'also'} send a message to the player here. Make sure you follow
                        the League's rules or
                        contracting players before you do so.
                    </Typography>
                )}

            </Grid>
            <Grid item md={8} xs={12}>
                <form onSubmit={this.sendMessage}>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   type="email"
                                   label="Your Email Address"
                                   value={currentUser.email}
                                   disabled
                                   helperText="Responses will be send directly to this email address"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   required
                                   error={this.state.errors.indexOf('contactSubject') > -1}
                                   className={classes.contactTextField}
                                   label="Subject Line"
                                   disabled={!this.props.currentUser.is_verify || this.props.user.is_messaged >= 2}
                                   value={this.state.contactSubject}
                                   onChange={this.handleChange('contactSubject')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextArea fullWidth
                                  required
                                  error={this.state.errors.indexOf('contactMessage') > -1}
                                  className={classes.contactTextField}
                                  rowsMax="4"
                                  label="Message"
                                  disabled={!this.props.currentUser.is_verify || this.props.user.is_messaged >= 2}
                                  value={this.state.contactMessage}
                                  onChange={this.handleChange('contactMessage')}
                        />
                    </Grid>
                    <Grid container align="center" justify="center">
                        <Grid item xs={6}>
                            <Button type="submit"
                                    color={!this.props.currentUser.is_verify || this.props.user.is_messaged >= 2 ? 'default' : 'primary'}
                                    raised
                                    disabled={!this.props.currentUser.is_verify || this.props.user.is_messaged >= 2}
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