import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withWrapper} from "create-react-server/wrapper";
import Player from '../components/Player';
import {matchPath} from 'react-router';
import {fetchVideo} from "../actions/index";
import {getUser} from "../../user/actions/index";

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
const mapDispatchToProps = (dispatch) => ({});


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
            path: '/profile/:id/video/:videoId/player',
        });
        const state = store.getState();

        await Promise.all([
            store.dispatch(fetchVideo(match.params.videoId, state.common.cookies.token)),
            store.dispatch(getUser(match.params.id, state.common.cookies.token)),
        ])

    };

    render() {

        return <Player {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Wrap);

export default withWrapper(Wrap);