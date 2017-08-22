/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Register from '../components/Register';

import {registerPlayer, registerScout} from '../actions';
import {getLeagues, getTeams} from '../../common/actions';
import {go} from '../../common/actions';

const mapStateToProps = (state) => ({
    leagues: state.common.leagues,
    //teams: state.common.teams,
});
const mapDispatchToProps = (dispatch) => ({
    registerPlayer: (user) => dispatch(registerPlayer(user)),
    registerScout: (user) => dispatch(registerScout(user)),
    goLogin: () => dispatch(go('/sign/in')),
    goRegister: () => dispatch(go('/sign/up')),
    getLeagues: () => dispatch(getLeagues()),
    //getTeams: () => dispatch(getTeams()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))