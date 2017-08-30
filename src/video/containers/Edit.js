/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Edit from '../components/Edit';

import {fetch, update, fetchTags} from '../actions';

const mapStateToProps = (state, props) => ({
    video: state.video.video,
    tags: state.video.tags
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: (id) => {
        dispatch(fetch(id));
        dispatch(fetchTags());
    },
    update: data => dispatch(update(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit))