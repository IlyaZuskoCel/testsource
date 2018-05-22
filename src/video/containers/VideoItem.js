import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withWrapper} from "create-react-server/wrapper";
import VideoItem from '../components/VideoItem';
import {matchPath} from 'react-router';
import {goBack, go} from '../../common/actions';
import {fetchVideo, fetchTags, deleteVideo, downloadVideo, sharedCount} from "../actions/index";
import {getUser, getCurrent} from "../../user/actions/index";

import {mapOptions} from '../../user/selectors';

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    id: props.match.params.id,
    videoId: props.match.params.videoId,
    video: state.video.video,
    tagOptions: mapOptions(state.video.tags),
    token: state.common.cookies.token
});
const mapDispatchToProps = (dispatch) => ({
    delete: (id,token) => dispatch(deleteVideo(id, token)),
    edit: id => dispatch(go('/video/edit/' + id)),
    goBack: () => dispatch(goBack()),
    go: (userId) => dispatch(go(`/profile/${userId}`)),
    downloadVideo: (video, token) => dispatch(downloadVideo(video, token)),
    sharedCount: (videoId, token) => dispatch(sharedCount(videoId, token)),
});


const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
   delete: id => dispatchProps.delete(id, stateProps.token),
   downloadVideo: (video) =>  dispatchProps.downloadVideo(video, stateProps.token),
   sharedCount: (videoId) => dispatchProps.sharedCount(videoId, stateProps.token),
});


class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        const match = matchPath(location.pathname, {
            path: '/profile/:id/video/:videoId',
        });
        const state = store.getState();

        await Promise.all([
            store.dispatch(fetchVideo(match.params.videoId, state.common.cookies.token)),
            store.dispatch(getUser(match.params.id, state.common.cookies.token)),
            store.dispatch(fetchTags(state.common.cookies.token)),
            store.dispatch(getCurrent(state.common.cookies.token)),
        ])

    };

    render() {

        return <VideoItem {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Wrap);

export default withWrapper(Wrap);