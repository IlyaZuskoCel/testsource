/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import ChangePassword from '../components/ChangePassword';

import {changePassword, resetPassword} from '../actions';

import {goBack} from '../../common/actions';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
    token: state.common.cookies.token
});
const mapDispatchToProps = (dispatch) => ({
    cancel: () => dispatch(goBack()),
    save: (password_old, password_new, token) => dispatch(changePassword(password_old, password_new, token)),
    sendTemporaryPassword: (token) => dispatch(resetPassword(token)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    save: (password_old, password_new) => dispatchProps.save(password_old, password_new, stateProps.token),
    sendTemporaryPassword: () => dispatchProps.sendTemporaryPassword(stateProps.token),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(ChangePassword))