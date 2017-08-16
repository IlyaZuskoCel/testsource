
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import Main from '../components/Main';
import {go} from '../../common/actions';

const mapStateToProps = (state, props) => ({
    type: props.match.params.type
});
const mapDispatchToProps = (dispatch) => ({
    goLogin: () =>  dispatch(go('/sign/in')),
    goRegister: () =>  dispatch(go('/sign/up')),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));