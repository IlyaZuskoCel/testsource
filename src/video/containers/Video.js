/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';


import Video from '../components/Video';

import {go} from '../../common/actions'

import {fetch, deleteVideo, sharedCount, downloadVideo} from '../actions';

import {map, mapOptions} from '../selectors';

const mapStateToProps = (state, props) => ({
    tags: map(state.video.tags),
    currentUser: state.user.current,
    token: state.common.cookies.token,
    user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
    delete: (id, token) => dispatch(deleteVideo(id, token)),
    edit: id => dispatch(go('/video/edit/' + id)),
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(Video))