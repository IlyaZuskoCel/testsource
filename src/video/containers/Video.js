/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';


import Video from '../components/Video';

import {go} from '../../common/actions'

import {fetch, deleteVideo} from '../actions';

import {map, mapOptions} from '../selectors';

const mapStateToProps = (state, props) => ({
    tags: map(state.video.tags),
    currentUser: state.user.current,
});

const mapDispatchToProps = (dispatch) => ({
    delete: id => dispatch(deleteVideo(id)),
    edit: id => dispatch(go('/video/edit/' + id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Video))