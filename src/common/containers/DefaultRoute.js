/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import DefaultRoute from '../components/DefaultRoute';

import {removeAlert} from '../actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.current !== null,
    alert: state.common.alert
});



const mapDispatchToProps = (dispatch) => ({
    hideAlert: () => dispatch(removeAlert()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultRoute));
