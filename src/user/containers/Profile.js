/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Profile from '../components/Profile';

import {getUser, sendEmail, getCurrent} from '../actions';
import {goBack} from '../../common/actions';

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    id: props.match.params.id || state.user.current.id,
    isCurrent: state.user.current && state.user.user && state.user.user.id === state.user.current.id
});
const mapDispatchToProps = (dispatch) => ({
    fetchData: id => {
        dispatch(getUser(id));
    },
    sendEmail: (id, subject, text) => dispatch(sendEmail(id, subject, text)),
    goBack: () => dispatch(goBack()),
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        console.log(params, "params");
        console.log(store, "Store");
        await store.dispatch(getUser(id)); //$$  под вопросом
    };

    componentDidMount() {
        this.props.fetchData(this.props.id);
    }

    render() {

        return <Profile {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps)(Wrap);

export default withWrapper(Wrap);