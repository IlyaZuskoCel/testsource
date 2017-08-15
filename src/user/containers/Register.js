/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Register from '../components/Register';

import {registerPlayer, registerScout} from '../actions';
import {go} from '../../common/actions';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    registerPlayer: (user) => dispatch(registerPlayer(user)),
    registerScout: (user) => dispatch(registerScout(user)),
    goLogin: () =>  dispatch(go('/login')),
    goRegister: () =>  dispatch(go('/register')),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))