/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';

import {Link, Icon} from '../../../common/components';


import verifiedImage from '../../../assets/image/check.png';


const styleSheet = createStyleSheet('PlayerForm', theme => ({
    root: {
        width: '100%',
        maxWidth: 1168,
        margin: 'auto',
        marginTop: 56,
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 16,
            paddingRight: 16,
        },
        [theme.breakpoints.down('md')]: {
            marginTop: 48,
            width: 'auto',
        },
    },
    content: {
        paddingTop: 32,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            paddingTop: 0,
        },

    },

    formWrap: {
        paddingBottom: 96,
        marginLeft: 40,
        marginRight: 40,
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
            marginRight: 0,
            marginTop: 40,
            paddingBottom: 40,
        },
        width: '100%',
        maxWidth: 688
    },

    switch: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    emailTextField: {
        marginTop: 56,
        marginBottom: 16,
        maxWidth: 340,
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
        },

    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 24,
        marginBottom: 16,
    },
    link: {
        ...theme.typography.body1,
        color: '#eb3941',
        textDecoration: 'underline',
        marginTop: 24,
        [theme.breakpoints.down('md')]: {
            marginTop: 8,
        },
    },
    radioAgent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioAgentWrap: {
        marginBottom: 16
    },
    emailAgentTextField: {
        marginBottom: 16,
        maxWidth: 340
    },
    radioAgentLabel: {
        marginRight: 24,
    },
    headerNavigation: {
        height: 48,
        zIndex: 500,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 60,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(287deg, #f55e58, #c9011b)'
    },
    backLink: {
        ...theme.typography.bottom,
        color: '#fff',
        textTransform: 'uppercase',
        width: 72
    },
    headerNavigationTitle: {
        color: '#fff',
    },
    subTitle: {marginTop: 80, marginBottom: 40},
    subTopTitle: {marginBottom: 40},
    buttons: {
        marginTop: 56
    },
    buttonCancel: {
        marginRight: 24,
        marginBottom: 24
    },
    verifiedWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16
    },
    phoneTextField: {
        marginRight: 24,
        maxWidth: 400
    },
    verifiedProgress: {
        marginBottom: 16
    },
    verifiedButtonWrap: {
        textAlign: 'right',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
        },
    },
    verifiedForm: {
        marginTop: 16
    },
    verifiedImage: {
        width: 24
    }
}));


const getUserState = user => ({
    is_private: user.is_private,
    email: user.email,
    phone: user.phone,
    coach: user.coach,
});

class ScoutForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...getUserState(props.user),
            errors: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.user)
            this.setState(getUserState(nextProps.user))
    }

    handleChange = name => event => {
        if (name === 'phone' && isNaN(event.target.value)) return;
        return this.setState({[name]: event.target.value})
    };
    handleSwitch = name => (event, checked) => {
        return this.setState({[name]: checked ? 1 : 0})
    };
    cancel = event => {
        event.preventDefault();
        this.props.cancel();
        return false;
    };
    submit = event => {
        event.preventDefault();

        const {is_private, email} = this.state;

        this.props.save({is_private, email});
        return false;
    };
    handleVerified = event => {
        event.preventDefault();
        this.props.getVerifiedScout(this.state.phone, this.state.coach);
        return false;
    };

    render() {
        const {classes, user} = this.props;

        return <div className={classes.root}>
            <Hidden only={['md', 'lg', 'xl']}>
                <div className={classes.headerNavigation}>
                    <Link to="/" onClick={this.cancel} invert disabledUnderline className={classes.backLink}>
                        <Icon>previous</Icon>
                    </Link>
                    <Typography type="body2" className={classes.headerNavigationTitle}>Settings</Typography>
                    <Link to="/" onClick={this.submit} invert disabledUnderline className={classes.backLink}>
                        <Icon>checkmark</Icon> Save
                    </Link>
                </div>
            </Hidden>
            <Hidden only={['xs', 'sm']}>
                <Typography type="headline">Settings</Typography>
            </Hidden>
            <div className={classes.content}>

                <form className={classes.formWrap} onSubmit={this.submit}>
                    <Typography type="subheading" className={classes.subTopTitle}>Account Information</Typography>
                    <div className={classes.switch}>
                        <Typography type="body2">Private Account</Typography>
                        <Switch checked={this.state.is_private === 1} onChange={this.handleSwitch('is_private')}/>
                    </div>
                    <Typography type="caption">Enable your profile information to be seen by people without Scout Zoo
                        accounts.</Typography>
                    <Typography type="caption"> Note: This does not include your contact information.</Typography>


                    <TextField fullWidth
                               required
                               error={this.state.errors.indexOf('email') > -1}
                               label="Your Email Address"
                               value={this.state.email || ''}
                               type="email"
                               onChange={this.handleChange('email')}
                               className={classes.emailTextField}/>
                    <Typography type="caption">This is the email address you will use to login to your Scout Zoo
                        account, and receive responses from the players you have contacted.</Typography>
                    <br/>
                    <Typography type="caption">Note: Your email address will not be made public. Players will only have
                        access to your email if you message them first.</Typography>

                    <div className={classes.links}>
                        <Link to="/settings/password" className={classes.link}>Change my password</Link>
                        <Link to="/profile/delete" className={classes.link}>Delete my account</Link>
                    </div>

                    {user.is_verify ? (
                        <div>
                            <Typography type="subheading" className={classes.subTitle}>You are a verified
                                scout! <img src={verifiedImage} className={classes.verifiedImage}/></Typography>

                            <Typography type="caption">You can contact players or their agents.</Typography>
                        </div>

                    ) : (
                        <div>
                            <Typography type="subheading" className={classes.subTitle}>Get Verified</Typography>
                            <Typography type="caption">You need to be verified as a scout by Scout Zoo in order to
                                contact players in the app. Please provide your coach, manager or head scout’s name and
                                phone number and we'll contact them to verify you as a scout within 72 hours. You will
                                get an email once you are verified.</Typography>

                            <Grid container className={classes.verifiedForm}>
                                <Grid item xs={12} md={6}>
                                    <TextField required
                                               fullWidth
                                               error={this.state.errors.indexOf('coach') > -1}
                                               label="Contact Name"
                                               value={this.state.coach || ''}
                                               onChange={this.handleChange('coach')}
                                               className={classes.phoneTextField}/>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField required
                                               fullWidth
                                               error={this.state.errors.indexOf('phone') > -1}
                                               label="Contact Phone Number"
                                               value={this.state.phone || ''}
                                               onChange={this.handleChange('phone')}
                                               className={classes.phoneTextField}/>
                                </Grid>

                                {user.phone && (
                                    <Grid item xs={12}>
                                        <Typography type="body1" className={classes.verifiedProgress}>Verification in
                                            progress.</Typography>
                                    </Grid>
                                )}
                                <Grid item xs={12} className={classes.verifiedButtonWrap}>
                                    <Button raised color={user.phone ? "default" : "primary"}
                                            onClick={this.handleVerified}
                                            disabled={user.phone}>
                                        Get verified
                                    </Button>
                                </Grid>
                            </Grid>


                        </div>
                    )}


                    <Hidden only={['xs', 'sm']}>
                        <div className={classes.buttons}>
                            <Button raised onClick={this.props.cancel} className={classes.buttonCancel}>Cancel</Button>
                            <Button raised color="primary" type="submit">Save</Button>
                        </div>
                    </Hidden>
                </form>
            </div>
        </div>
    }
}

ScoutForm.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(ScoutForm);