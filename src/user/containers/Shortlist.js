import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
import {connect} from 'react-redux';
import Shortlist from '../components/Shortlist';
import {removeFavorite} from "../actions/index";
import {getFollowedList, getCurrent} from "../actions/index";

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    results: state.user.shortlist,
    headers: state.search.headers,
    token: state.common.cookies.token,
});
const mapDispatchToProps = (dispatch) => ({
    removeFavorite: (playerId, token) => dispatch(removeFavorite(playerId, token)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    removeFavorite: (playerId) => dispatchProps.removeFavorite(playerId, stateProps.token),

});
class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        const state = store.getState();
        return await Promise.all([
            store.dispatch(getFollowedList(state.common.cookies.token)),
            store.dispatch(getCurrent(state.common.cookies.token)),
        ])

    };

    render() {

        return <Shortlist {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Wrap);

export default withWrapper(Wrap);