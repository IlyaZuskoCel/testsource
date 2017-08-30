/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Add from '../components/Add';

import {upload, update, fetchTags, updateVideoField} from '../actions';

import {map, mapOptions} from '../selectors';

const mapStateToProps = (state, props) => ({
    video: state.video.video,
    tags: map(state.video.tags),
    tagOptions: mapOptions(state.video.tags)
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchTags()),
    upload: file => dispatch(upload(file)),
    update: data => dispatch(update(data)),
    updateField: (name, value) => dispatch(updateVideoField(name, value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add))