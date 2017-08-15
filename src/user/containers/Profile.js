/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Profile from '../components/Profile';

import {getUser, sendEmail} from '../actions';
import {goBack} from '../../common/actions';

const mapStateToProps = (state) => ({
    currentUser: state.user.current,
    user: state.user.user
});
const mapDispatchToProps = (dispatch) => ({
    getUser: id => dispatch(getUser(id)),
    report: id => dispatch(getUser(id)),
    sendEmail: (id, subject, text) => dispatch(sendEmail(id, subject, text)),
    goBack: () => dispatch(goBack()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))