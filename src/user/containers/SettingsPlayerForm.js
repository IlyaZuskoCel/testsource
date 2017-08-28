/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import PlayerForm from '../components/Settings/PlayerForm';

import {goBack} from '../../common/actions';
import {update} from '../actions';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
});

const mapDispatchToProps = (dispatch) => ({
    cancel: () => dispatch(goBack()),
    save: (data) => dispatch(update(data)),
    goChangePassword: () => dispatch(goBack()),
    goDeleteAccount: () => dispatch(goBack()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayerForm))