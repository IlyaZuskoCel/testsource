/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Add from '../components/Add';

import {upload, trim, clear, postVideo, fetchTags, updateVideoField} from '../actions';

import {map, mapOptions} from '../selectors';

const mapStateToProps = (state, props) => ({
    video: state.video.video,
    tags: map(state.video.tags),
    tagOptions: mapOptions(state.video.tags)
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => {
        dispatch(clear());
        dispatch(fetchTags());
    },
    upload: file => dispatch(upload(file)),
    trim: (id, start, end) => dispatch(trim(id, start, end)),
    update: data => dispatch(postVideo(data)),
    updateField: (name, value) => dispatch(updateVideoField(name, value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add))