/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Edit from '../components/Edit';

import {getCurrent, uploadPhoto} from '../actions';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
});

const mapDispatchToProps = (dispatch) => ({
    getUser: id => dispatch(getCurrent()),
    uploadPicture: (file) => dispatch(uploadPhoto(file)),
    deletePicture: () => dispatch(getCurrent()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit))