/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import {addErrorAlert} from '../../common/actions';

import ContactForm from '../components/ContactForm';

import {sendEmail} from '../actions';

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    token: state.common.cookies.token,
});
const mapDispatchToProps = (dispatch) => ({
    error: message => dispatch(addErrorAlert(message)),
    sendEmail: (id, subject, text, token) => dispatch(sendEmail(id, subject, text, token)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    sendEmail: (id, subject, text) => dispatchProps.sendEmail(id, subject, text, stateProps.token),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ContactForm)