/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Header from '../components/Header';

import {logOut} from '../../user/actions';
import {go} from '../actions';

const mapStateToProps = (state) => ({
    user: state.user.current,
    hideBackground: !state.common.header.background
});


const mapDispatchToProps = (dispatch) => ({
    logOut: (username, password) => dispatch(logOut()),
    go: page => dispatch(go(page)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))