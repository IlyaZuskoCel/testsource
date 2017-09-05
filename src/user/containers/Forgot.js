import {connect} from 'react-redux';
import Forgot from '../components/Forgot';
import {forgotPassword, forgotPasswordToken} from '../actions';
import {go} from '../../common/actions';

const mapStateToProps = (state, props) => ({
    token: props.match.params.token,
});
const mapDispatchToProps = (dispatch) => ({
    sendEmail: email => dispatch(forgotPassword(email)),
    changePassword: (token, password, password2) => dispatch(forgotPasswordToken(token, password, password2)),
    cancel: () => dispatch(go('/sign/in'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);