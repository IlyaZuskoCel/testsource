/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import ScoutForm from '../components/Settings/ScoutForm';

import {goBack} from '../../common/actions';
import {update, verifyScout} from '../actions';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
});

const mapDispatchToProps = (dispatch) => ({
    cancel: () => dispatch(goBack()),
    save: (data) => dispatch(update(data)),
    getVerifiedScout: (phone, name) => dispatch(verifyScout(phone, name)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScoutForm))