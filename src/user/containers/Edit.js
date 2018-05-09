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
});

const mapDispatchToProps = (dispatch) => ({
    getUser: id => dispatch(getCurrent()),
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        await store.dispatch(getCurrent());
    };

    componentDidMount() {
        this.props.getUser();
    }

    render() {

        return <Edit {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps)(Wrap);

export default withWrapper(Wrap);