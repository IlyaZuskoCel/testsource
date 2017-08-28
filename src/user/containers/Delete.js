/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Delete from '../components/Delete';

import {deleteProfile} from '../actions';
import {goBack} from '../../common/actions';

const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = (dispatch) => ({
    cancel: () => dispatch(goBack()),
    save: (password, why) => dispatch(deleteProfile(password, why)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Delete))