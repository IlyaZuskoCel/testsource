import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
import {connect} from 'react-redux';
import Shortlist from '../components/Shortlist';
import {removeFavorite} from "../actions/index";
import {getFollowedList} from "../actions/index";

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    results: state.user.shortlist,
    headers: state.search.headers,
});
const mapDispatchToProps = (dispatch) => ({
    getFollowedList: () => dispatch(getFollowedList()),
    removeFavorite: (playerId) => dispatch(removeFavorite(playerId)),
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        await store.dispatch(getFollowedList());
    };

    componentDidMount() {
        this.props.getFollowedList();
    }

    render() {

        return <Shortlist {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps)(Wrap);

export default withWrapper(Wrap);