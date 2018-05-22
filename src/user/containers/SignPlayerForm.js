/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import SignPlayerForm from '../components/Sign/PlayerForm';

import {registerPlayer} from '../actions';


const mapStateToProps = (state) => ({
    token: state.common.cookies.token,
});
const mapDispatchToProps = (dispatch) => ({
    register: (user, token) => dispatch(registerPlayer(user, token)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    register: (user) => dispatchProps.register(user, stateProps.token),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(SignPlayerForm))