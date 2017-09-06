import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import RecoveryPassword from '../components/RecoveryPassword';

import {go} from '../../common/actions';
import {resetPasswordRequest} from "../actions";


const mapStateToProps = (state, props) => ({
    email: state.email,
});
const mapDispatchToProps = (dispatch) => ({
    goLogin: () => dispatch(go('/sign/in')),
    sendToken: (email) => dispatch(resetPasswordRequest(email)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecoveryPassword))