
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import Sign from '../components/Sign';
import {go} from '../../common/actions';

const mapStateToProps = (state, props) => ({
    type: props.match.params.type
});
const mapDispatchToProps = (dispatch) => ({
    goLogin: () =>  dispatch(go('/sign/in')),
    goRegister: () =>  dispatch(go('/sign/up')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sign);