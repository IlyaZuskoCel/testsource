/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Edit from '../components/Edit';

import {fetch, update, fetchTags, updateVideoField} from '../actions';

import {map, mapOptions} from '../selectors';

const mapStateToProps = (state, props) => ({
    video: state.video.video,
    id: props.match.params.id || state.user.current.id,
    tags: map(state.video.tags),
    tagOptions: mapOptions(state.video.tags)
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: (id) => {
        dispatch(fetch(id));
        dispatch(fetchTags());
    },
    update: data => dispatch(update(data)),
    updateField: (name, value) => dispatch(updateVideoField(name, value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit))