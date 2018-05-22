/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withWrapper} from "create-react-server/wrapper";

import VideoList from '../components/VideoList';

import {fetchTags} from '../actions';
import {getCurrent} from '../../user/actions';
import {map} from '../selectors'

const mapStateToProps = (state, props) => ({
    tags: map(state.video.tags),
    token: state.common.cookies.token
});
const mapDispatchToProps = (dispatch) => ({

});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        const state = store.getState();
        return await Promise.all([
            store.dispatch(fetchTags(state.common.cookies.token)),
            store.dispatch(getCurrent(state.common.cookies.token)),
        ])
    };

    render() {

        return <VideoList {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps)(Wrap);

export default withWrapper(Wrap);