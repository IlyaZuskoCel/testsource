/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import SignInForm from '../components/Sign/InForm';

import {logIn} from '../actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.current !== null,
    token: state.common.cookies.token,
});
const mapDispatchToProps = (dispatch) => ({
    logIn: (username, password, token) => dispatch(logIn(username, password, token))
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    logIn: (username, password) => dispatchProps.logIn(username, password, stateProps.token),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(SignInForm))