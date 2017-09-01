/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {connect} from 'react-redux';

import Profile from '../components/VideoList';

import {fetchTags} from '../actions';

import {map} from '../selectors'

const mapStateToProps = (state, props) => ({
    tags: map(state.video.tags),
});
const mapDispatchToProps = (dispatch) => ({
    fetchData: () => {
        dispatch(fetchTags());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)