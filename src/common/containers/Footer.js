/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Footer from '../components/Footer';

import {logOut} from '../../user/actions';
import {go} from '../actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.current !== null
});


const mapDispatchToProps = (dispatch) => ({
    logOut: (username, password) => dispatch(logOut()),
    go: page => dispatch(go(page)),
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Footer))