/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import {Link} from '../../../common/components';
import ScoutIcon from '../../../common/components/Icon';
import Typography from 'material-ui/Typography';
import FormControl from 'material-ui/Form/FormControl';

const styleSheet = createStyleSheet('ChangePassword', theme => ({
    rootMain: {
        alignSelf: 'center',

        [theme.breakpoints.down('sm')]: {},
    },
    content: {
        paddingTop: 32,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            paddingTop: 0,
        },
    },

    formWrap: {
        paddingBottom: 96,
        marginLeft: 40,
        marginRight: 40,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 0,
            marginTop: 40,
            paddingBottom: 40,
        },
        width: '100%',
        maxWidth: 688
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

    passwords: {
        paddingBottom: 32
    },
    root: {
        backgroundColor: '#ffffff',
    },
    root2: {
               [theme.breakpoints.up('sm')]: {},
    },
    logo: {
        fontSize: 34,
        color: '#fff',
        marginLeft: 10,
        [theme.breakpoints.up('sm')]: {
            lineHeight: '10px',
            float: 'left',
            marginTop: 55,
        },
        [theme.breakpoints.down('sm')]: {

            fontSize: 100,
            lineHeight: '180px',
            height: 197,
        }

    },
    grid: {
        display: 'inline-block',

    },
    header: {
        marginTop: 111,
        marginLeft: '30%',

        [theme.breakpoints.down('md')]: {
            marginLeft: 192,
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',

        height: 70,
        //backgroundColor: '#ffffff',
        backgroundImage: 'linear-gradient(279deg, #f55e58, #c9011b)',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            height: 180,
        }
    },
    hideBackground: {
        backgroundColor: 'transparent',
        transform: 'none',
        backgroundImage: 'none'
    },
    hideShadow: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        transform: 'none',
        backgroundImage: 'none'
    },
    headerText: {
        marginBottom: 32,
        // marginRight: 136,
        color: '#fff',
        [theme.breakpoints.up('sm')]: {
            alignSelf: 'center',
        },
    },
    enterEmail: {
        color: '#000',
        //marginTop: 100,
    },
    formControl: {
        minWidth: '100%',
        marginTop: 24,
    },
    button: {
        marginTop: 32,
        marginBottom: 164,
        maxWidth: 176,
        alignSelf: 'center',
    },
}));


class RecoveryPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            email: '',
        };
    }

    handleChange = name => event => {
        return this.setState({[name]: event.target.value})
    };

    handleEmailMe = event => {
        console.log('inside handle email me a token', event);
        event.preventDefault();
        this.props.sendToken(this.state.email);
        console.log('after send token');
        this.setState({email: ''});
        return false;
    };

    render() {
        const {classes} = this.props;
        const hideBackground = (this.props.hideBackgroundTopHeader && !this.state.scroll)
            || (this.props.hideBackgroundTopMobileHeader && width === 'xs');
        return (
            <div className={classes.rootMain}>
                <AppBar position='fixed'
                        className={classNames(classes.container, {[classes.hideShadow]: hideBackground})}>
                    <div className={classes.root2}>
                        <ScoutIcon className={classes.logo}>scoutzoo-symbol</ScoutIcon>

                    </div>
                    <Typography type="body2" className={classes.headerText}>Password Reset</Typography>
                </AppBar>
                <div style={{}}>
                    <div style={{height: 48, width: 328, marginTop: 162}}>
                        <Typography type="body1" className={classes.enterEmail}>
                            Enter your email address and a temporary password will be emailed to you.
                        </Typography>
                    </div>
                    <form className={classes.form} onSubmit={this.handleEmailMe}>
                        <TextField id="email"
                                   required
                                   label="Email"
                                   value={this.state.email}
                                   onChange={this.handleChange('email')}
                                   className={classes.formControl}
                        />
                        <div style={{display: 'inline-block', marginLeft: 38, marginTop: 24}}>
                            <div style={{display: 'inline-block'}}>
                                <Link to="/sign/in">
                                    <Typography type="body2">
                                        CANCEL
                                    </Typography>
                                </Link>
                            </div>
                            <div style={{display: 'inline-block', marginLeft: 20}}>
                                <FormControl>
                                    <Button raised type="submit" color="primary" className={classes.button}>
                                        reset password
                                    </Button>
                                </FormControl>
                            </div>
                        </div>
                    </form>

                </div>
            </div>);
    }
}

RecoveryPassword.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(RecoveryPassword);