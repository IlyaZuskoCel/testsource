/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
import {connect} from 'react-redux';

import DefaultRoute from '../components/DefaultRoute';

import {removeAlert} from '../actions';
import {getCurrent as getCurrentUser} from '../../user/actions'

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.current !== null,
    alert: state.common.alert,
    loader: state.common.loader,
});

const mapDispatchToProps = (dispatch) => ({
    hideAlert: () => dispatch(removeAlert()),
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        const state = store.getState();
        await store.dispatch(getCurrentUser(state.common.cookies.token));
    };


    render() {
        return <DefaultRoute {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps)(Wrap);


export default withWrapper(Wrap);