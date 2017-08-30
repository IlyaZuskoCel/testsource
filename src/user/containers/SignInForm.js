/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import SignInForm from '../components/Sign/InForm';

import {logIn} from '../actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.current !== null
});
const mapDispatchToProps = (dispatch) => ({
    logIn: (username, password) => dispatch(logIn(username, password))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInForm))