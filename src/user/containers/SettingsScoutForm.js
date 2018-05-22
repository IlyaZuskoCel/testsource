/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import ScoutForm from '../components/Settings/ScoutForm';

import {goBack} from '../../common/actions';
import {update, verifyScout} from '../actions';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
    token: state.common.cookies.token,
});

const mapDispatchToProps = (dispatch) => ({
    cancel: () => dispatch(goBack()),
    save: (data, token) => dispatch(update(data, token)),
    getVerifiedScout: (phone, name, token) => dispatch(verifyScout(phone, name, token)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    save: (data) => dispatchProps.save(data, stateProps.token),
    getVerifiedScout: (phone, name) => dispatchProps.getVerifiedScout(phone, name, stateProps.token),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(ScoutForm))