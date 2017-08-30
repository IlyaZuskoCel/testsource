/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import SignPlayerForm from '../components/Sign/PlayerForm';

import {registerPlayer} from '../actions';


const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    register: (user) => dispatch(registerPlayer(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignPlayerForm))