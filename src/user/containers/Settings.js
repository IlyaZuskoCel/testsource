/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Settings from '../components/Settings';

import {getCurrent} from '../actions';
import {goBack} from '../../common/actions';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
});
const mapDispatchToProps = (dispatch) => ({
    getUser: id => dispatch(getCurrent()),
    cancel: () => dispatch(goBack()),
    save: () => dispatch(goBack()),
    goChangePassword: () => dispatch(goBack()),
    goDeleteAccount: () => dispatch(goBack()),
    getVerifiedScout: () => dispatch(goBack()),
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        await store.dispatch(getCurrent());
    };

    componentDidMount() {
        this.props.getUser();
    }

    render() {

        return <Settings {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps)(Wrap);

export default withWrapper(Wrap);