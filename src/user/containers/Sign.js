import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import Sign from '../components/Sign';
import {go} from '../../common/actions';

const mapStateToProps = (state, props) => ({
    type: props.match.params.type || 'in',
    user: props.match.params.user || 'player'
});
const mapDispatchToProps = (dispatch) => ({
    goLogin: () => dispatch(go('/sign/in')),
    goRegister: (type) => dispatch(go(`/sign/up/${type}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sign);