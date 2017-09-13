/**
 * Created by aleksandr on 8/12/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    ShareButtons,
    ShareCounts,
    generateShareIcon
} from 'react-share';


import CopyToClipboard from 'react-copy-to-clipboard';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import {Link, Icon} from '../../../common/components';


const {
    FacebookShareButton,
    TwitterShareButton,
} = ShareButtons;


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
    },
    buttonsWrap: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    icon: {
        marginLeft: 16,
        marginRight: 16,
        fontSize: 24,
        lineHeight: '48px'
    },

    button: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 260,
        height: 48,
        color: '#ffffff',


    },
    name: {
        color: '#ffffff'
    },
    facebookButton: {
        backgroundColor: '#3f51b5',
        [theme.breakpoints.up('sm')]: {
            marginRight: 8
        }
    },
    twitterButton: {
        backgroundColor: '#03a9f4',
        [theme.breakpoints.down('sm')]: {
            marginTop: 16
        }
    },
    copyButton: {
        backgroundColor: '#c2a24d',
        marginTop: 16
    },
    buttons: {
        justifyContent: 'flex-start'
    },
    message: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    alertIcon: {
        marginRight: 24
    },
}));


class ShareButton extends Component {
    state = {
        isOpen: false,
        message: null
    };

    handleOpen = event => {
        event.preventDefault();
        this.setState({isOpen: true});
        return false;
    };
    handleCancel = type => event => {
        event && event.preventDefault && event.preventDefault();
        this.setState({isOpen: false, message: type === 'clipboard' ? 'Link copied to clipboard.' : null});
        return false;
    };
    hideMessage = () => this.setState({message: null});

    render() {
        const {classes, url, title} = this.props;

        return <div>
            <Link to="/" onClick={this.handleOpen} invert disabledUnderline className={classes.root}>
                <Icon>share</Icon>
                <span className={classes.title}>Share</span>
            </Link>
            <Dialog open={this.state.isOpen}
                    onRequestClose={this.handleCancel()}>
                <DialogTitle disableTypography>
                    <Typography type="subheading">
                        Share your profile
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.buttonsWrap}>
                        <FacebookShareButton url={url} quote={title} beforeOnClick={this.handleCancel('facebook')}>
                            <Typography type="body2" className={classNames(classes.button, classes.facebookButton)}>
                                <Icon className={classes.icon}>social-facebook</Icon>
                                Share on Facebook
                            </Typography>
                        </FacebookShareButton>
                        <TwitterShareButton url={url} title={title} beforeOnClick={this.handleCancel('twitter')}>
                            <Typography type="body2" className={classNames(classes.button, classes.twitterButton)}>
                                <Icon className={classes.icon}>twitter-outline</Icon>
                                Share on Twitter
                            </Typography>

                        </TwitterShareButton>

                    </div>
                    <div className={classes.buttonsWrap}>
                        <CopyToClipboard text={url} onCopy={this.handleCancel('clipboard')}>
                            <Typography type="body2" className={classNames(classes.button, classes.copyButton)}>
                                <Icon className={classes.icon}>share</Icon>
                                Copy link to clipboard
                            </Typography>

                        </CopyToClipboard>
                    </div>
                </DialogContent>
                <DialogActions className={classes.buttons}>
                    <Button onClick={this.handleCancel()}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={3000}
                onRequestClose={this.hideMessage}
                open={!!this.state.message}
                message={<div className={classes.message}>
                    <Icon className={classes.alertIcon}
                               color="success">checkmark</Icon>
                    <Typography type="body2"> {this.state.message}</Typography>

                </div>}

            />
        </div>
    }
}

ShareButton.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default withStyles(styleSheet)(ShareButton);