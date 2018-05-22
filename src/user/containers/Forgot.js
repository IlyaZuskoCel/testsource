import {connect} from 'react-redux';
import Forgot from '../components/Forgot';
import {forgotPassword, forgotPasswordToken} from '../actions';
import {go} from '../../common/actions';

const mapStateToProps = (state, props) => ({
    token: props.match.params.token,
    authorizationToken: state.common.cookies.token
});
const mapDispatchToProps = (dispatch) => ({
    sendEmail: (email, token) => dispatch(forgotPassword(email, token)),
    changePassword: (token, password, password2, authorizationToken) => dispatch(forgotPasswordToken(token, password, password2, authorizationToken)),
    cancel: () => dispatch(go('/sign/in'))
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    changePassword: (token, password, password2) => dispatchProps.changePassword(token, password, password2, stateProps.authorizationToken),
    sendEmail: (email) => dispatchProps.sendEmail(email, stateProps.authorizationToken),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Forgot);