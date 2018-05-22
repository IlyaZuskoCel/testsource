/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withWrapper} from "create-react-server/wrapper";
import Add from '../components/Add';
import {matchPath} from 'react-router';
import {upload, trim, clear, postVideo, fetchTags, updateVideoField} from '../actions';

import {getUser, getCurrent} from '../../user/actions';

import {map, mapOptions} from '../selectors';

const mapStateToProps = (state, props) => ({
    video: state.video.video,
    tags: map(state.video.tags),
    tagOptions: mapOptions(state.video.tags),
    userId: state.user.current && state.user.current.id,
    user: state.user.current,
    token: state.common.cookies.token
});

const mapDispatchToProps = (dispatch) => ({
    upload: (file, token) => dispatch(upload(file, token)),
    trim: (id, start, end, token) => dispatch(trim(id, start, end, token)),
    update: (data, token) => dispatch(postVideo(data, token)),
    updateField: (name, value) => dispatch(updateVideoField(name, value)),
});


const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    update: data => dispatchProps.update(data, stateProps.token),
    trim: (id, start, end) => dispatchProps.trim(id, start, end, stateProps.token),
    upload: file => dispatchProps.upload(file, stateProps.token),
});



class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        const match = matchPath(location.pathname, {
            path: '/profile/:id/',
        });

        const state = store.getState();
        return await Promise.all([
            store.dispatch(clear()),
            store.dispatch(fetchTags(state.common.cookies.token)),
            store.dispatch(getUser(match.params.id, state.common.cookies.token)),
            store.dispatch(getCurrent(state.common.cookies.token)),
        ])

    };

    render() {

        return <Add {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Wrap);

export default withWrapper(Wrap);