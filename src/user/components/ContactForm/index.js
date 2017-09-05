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
        width: '100%',
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

                {user.message_date && (
                    <Typography type="caption">
                        You contacted this player on {moment(user.message_date).format('MMMM Do, YYYY')}.
                    </Typography>
                )}


                {user.have_agent ? (
                    <Typography type="body1">
                        <strong>You are contacting this player’s agent.</strong> Responses will
                        be send
                        directly
                        to your email as indicated.
                    </Typography>
                ) : (
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
                        <TextField
                            type="email"
                            className={classes.contactTextField}
                            label="Your Email Address"
                            value={currentUser.email}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.contactTextField}
                            label="Subject Line"
                            value={this.state.contactSubject}
                            onChange={this.handleChange('contactSubject')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.contactTextField}
                            label="Message"
                            value={this.state.contactMessage}
                            onChange={this.handleChange('contactMessage')}
                        />
                    </Grid>
                    <Grid container align="center" justify="center">
                        <Grid item xs={6}>
                            <Button type="submit"
                                    color={!this.props.currentUser.is_verify ? 'default' : 'primary'}
                                    raised
                                    disabled={!this.props.currentUser.is_verify}
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