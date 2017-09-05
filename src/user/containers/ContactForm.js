/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import ContactForm from '../components/ContactForm';

import {sendEmail} from '../actions';

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current
});
const mapDispatchToProps = (dispatch) => ({
    sendEmail: (id, subject, text) => dispatch(sendEmail(id, subject, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)