/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Footer from '../components/Footer';

import {logOut} from '../../user/actions';
import {go} from '../actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.current !== null,
    user: state.user.current,
    hide: state.common.footer,
    token: state.common.cookies.token,
});

const mapDispatchToProps = (dispatch) => ({
    logOut: (token) => dispatch(logOut(token)),
    go: page => dispatch(go(page)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    logOut: () => dispatchProps.logOut(stateProps.token),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Footer)