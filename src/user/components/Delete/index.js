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
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';

import {Link, Icon, DropDown} from '../../../common/components';


import {DELETE_REASON_LIST} from '../../constants';

const whyOptions = Object.keys(DELETE_REASON_LIST).map(value => ({
    label: DELETE_REASON_LIST[value],
    value
}));


const styleSheet = createStyleSheet('Delete', theme => ({
    root: {
        width: '100%',
        maxWidth: 1168,
        margin: 'auto',
        marginTop: 56,
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 16,
            paddingRight: 16,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: 48,
            width: 'auto',
        },
    },
    content: {
        paddingTop: 32,

        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            // paddingTop: 0,
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
        [theme.breakpoints.down('sm')]: {
            marginTop: 8,
        },
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
        marginTop: 56,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
    },
    buttonCancel: {
        marginRight: 24,
        marginBottom: 24
    },

    passwords: {
        paddingBottom: 32
    }
}));


class Delete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            why: '',
            errors: []
        };
    }


    handleChange = name => event => {
        return this.setState({[name]: event.target.value})
    };
    cancel = event => {
        event.preventDefault();
        this.props.cancel();
        return false;
    };
    submit = event => {
        event.preventDefault();
        const {password, why} = this.state;
        this.props.save(password, why);
        return false;
    };


    render() {
        const {classes} = this.props;

        return <div className={classes.root}>
            <Hidden smUp>
                <div className={classes.headerNavigation}>
                    <Link to="/" onClick={this.cancel} invert disabledUnderline className={classes.backLink}>
                        <Icon>previous</Icon>
                    </Link>
                    <Typography type="body2" className={classes.headerNavigationTitle}>Delete my account</Typography>
                    <div className={classes.backLink}/>
                </div>
            </Hidden>
            <Hidden xsDown>
                <Typography type="headline">Delete my account</Typography>
            </Hidden>
            <div className={classes.content}>
                <Typography type="body">All of your information and videos will be erased if you delete your account.</Typography>
                <form className={classes.formWrap} onSubmit={this.submit}>
                    <Grid container className={classes.passwords}>
                        <Grid item xs={12} sm={12} md={8}>
                            <DropDown fullWidth
                                      error={this.state.errors.indexOf('why') > -1}
                                      options={whyOptions}
                                      value={DELETE_REASON_LIST[this.state.why]}
                                      label="Why are you deleting your account?"
                                      onChange={this.handleChange('why')}/>
                        </Grid>
                        <Hidden xsDown>
                            <Grid item xs={12} sm={12} md={8}/>
                        </Hidden>
                        <Grid item xs={12} sm={12} md={8}>
                            <TextField fullWidth
                                       required
                                       error={this.state.errors.indexOf('password') > -1}
                                       label="Confirm your Password"
                                       value={this.state.password}
                                       type="password"
                                       onChange={this.handleChange('password')}/>
                        </Grid>
                    </Grid>


                    <div className={classes.buttons}>
                        <Hidden xsDown>
                            <Button raised onClick={this.props.cancel}
                                    className={classes.buttonCancel}>Cancel</Button>
                        </Hidden>
                        <Button raised color="primary" type="submit">Delete my Account</Button>
                    </div>

                </form>
            </div>
        </div>
    }
}

Delete.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(Delete);