/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Header from '../components/Header';

import {logOut} from '../../user/actions';
import {go} from '../actions';
import {uploadPlayers} from "../../search/actions/index";

const mapStateToProps = (state) => ({
    user: state.user.current,
});


const mapDispatchToProps = (dispatch) => ({
    logOut: (username, password) => dispatch(logOut()),
    go: page => dispatch(go(page)),
    uploadPlayers: (params) => dispatch(uploadPlayers(params)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))