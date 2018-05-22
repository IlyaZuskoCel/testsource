/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Header from '../components/Header';

import {logOut, getCurrent} from '../../user/actions';
import {go} from '../actions';

const mapStateToProps = (state) => ({
    user: state.user.current,
    hideBackground: !state.common.header.background,
    token: state.common.cookies.token,
});


const mapDispatchToProps = (dispatch) => ({
    logOut: (token) => dispatch(logOut(token)),
    go: page => dispatch(go(page)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    logOut: () => dispatchProps.logOut(stateProps.token),
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store, routeProps , aaa}) {
        const state = store.getState();
        await store.dispatch(getCurrent(state.common.cookies.token));
    };

    render() {

        return <Header {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Wrap);

export default withWrapper(Wrap);