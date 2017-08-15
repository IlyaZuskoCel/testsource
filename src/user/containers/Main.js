
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import Main from '../components/Main';
import {go} from '../../common/actions';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    goLogin: () =>  dispatch(go('/login')),
    goRegister: () =>  dispatch(go('/register')),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));