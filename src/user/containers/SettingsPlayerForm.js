/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import PlayerForm from '../components/Settings/PlayerForm';

import {goBack} from '../../common/actions';
import {update} from '../actions';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
    token: state.common.cookies.token
});

const mapDispatchToProps = (dispatch) => ({
    cancel: () => dispatch(goBack()),
    save: (data, token) => dispatch(update(data, token)),
    goChangePassword: () => dispatch(goBack()),
    goDeleteAccount: () => dispatch(goBack()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    save: (data) => dispatchProps.save(data, stateProps.token),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlayerForm))