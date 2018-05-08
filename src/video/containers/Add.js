/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Add from '../components/Add';

import {upload, trim, clear, postVideo, fetchTags, updateVideoField} from '../actions';

import {getUser} from '../../user/actions'

import {map, mapOptions} from '../selectors';

const mapStateToProps = (state, props) => ({
    video: state.video.video,
    tags: map(state.video.tags),
    tagOptions: mapOptions(state.video.tags),
    id: props.match.params.id || state.user.current.id,
    user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: id => {
        dispatch(clear());
        dispatch(fetchTags());
        dispatch(getUser(id));
    },
    upload: file => dispatch(upload(file)),
    trim: (id, start, end) => dispatch(trim(id, start, end)),
    update: data => dispatch(postVideo(data)),
    updateField: (name, value) => dispatch(updateVideoField(name, value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add))