/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Delete from '../components/Delete';

import {deleteProfile} from '../actions';
import {goBack} from '../../common/actions';

const mapStateToProps = (state, props) => ({
    token: state.common.cookies.token,
});
const mapDispatchToProps = (dispatch) => ({
    cancel: () => dispatch(goBack()),
    save: (password, why, token) => dispatch(deleteProfile(password, why, token)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    save: (password, why) => dispatchProps.save(password, why, stateProps.token),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(Delete))