/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {withWrapper} from "create-react-server/wrapper";
import Edit from '../components/Edit';
import {matchPath} from 'react-router';

import {fetchVideo, update, trim, fetchTags, updateVideoField} from '../actions';
import {getUser, getCurrent} from '../../user/actions'

import {map, mapOptions} from '../selectors';

const mapStateToProps = (state, props) => ({
    video: state.video.video,
    id: props.match.params.id,
    userId: state.user.current && state.user.current.id,
    tags: map(state.video.tags),
    tagOptions: mapOptions(state.video.tags),
    user: state.user.current,
    token: state.common.cookies.token
});

const mapDispatchToProps = (dispatch) => ({
    getUser: (userId , token)=> dispatch(getUser(userId, token)),
    update: (data, token) => dispatch(update(data, token)),
    trim: (id, start, end, token) => dispatch(trim(id, start, end, token)),
    updateField: (name, value) => dispatch(updateVideoField(name, value)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    getUser: userId => dispatchProps.getUser(userId, stateProps.token),
    update: data => dispatchProps.update(data, stateProps.token),
    trim: (id, start, end) => dispatchProps.trim(id, start, end, stateProps.token),
});


class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        const match = matchPath(location.pathname, {
            path: '/video/edit/:videoId',
        });
        const state = store.getState();
        return await Promise.all([
            store.dispatch(fetchTags(state.common.cookies.token)),
            store.dispatch(fetchVideo(match.params.videoId, state.common.cookies.token)),
            store.dispatch(getCurrent(state.common.cookies.token)),
        ])


    };
    render() {

        return <Edit {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Wrap);

export default withWrapper(Wrap);