import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import VideoItem from '../components/VideoItem';

import {goBack, go} from '../../common/actions';
import {fetchVideo, fetchTags, deleteVideo, downloadVideo, sharedCount} from "../actions/index";
import {getUser} from "../../user/actions/index";

import {mapOptions} from '../../user/selectors';

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    id: props.match.params.id,
    videoId: props.match.params.videoId,
    video: state.video.video,
    tagOptions: mapOptions(state.video.tags)
});
const mapDispatchToProps = (dispatch) => ({
    fetchData: (id, videoId) => {
        dispatch(getUser(id));
        dispatch(fetchVideo(videoId));
        dispatch(fetchTags());
    },
    delete: id => dispatch(deleteVideo(id)),
    edit: id => dispatch(go('/video/edit/' + id)),
    goBack: () => dispatch(goBack()),
    go: (userId) => dispatch(go(`/profile/${userId}`)),
    downloadVideo: (video) => dispatch(downloadVideo(video)),
    sharedCount: (videoId) => dispatch(sharedCount(videoId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoItem))