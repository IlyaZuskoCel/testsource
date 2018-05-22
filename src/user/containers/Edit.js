/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Edit from '../components/Edit';

import {getCurrent} from '../actions';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
    token: state.common.cookies.token,
});

const mapDispatchToProps = (dispatch) => ({

});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        const state = store.getState();
        await store.dispatch(getCurrent(state.common.cookies.token));
    };

    render() {

        return <Edit {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps)(Wrap);

export default withWrapper(Wrap);