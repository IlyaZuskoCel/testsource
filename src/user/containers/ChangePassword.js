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
});
const mapDispatchToProps = (dispatch) => ({
    cancel: () => dispatch(goBack()),
    save: (password_old, password_new) => dispatch(changePassword(password_old, password_new)),
    sendTemporaryPassword: () => dispatch(resetPassword()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword))