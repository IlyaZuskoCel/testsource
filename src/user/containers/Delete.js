/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Delete from '../components/Delete';

import {getCurrent} from '../actions';
import {goBack} from '../../common/actions';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
});
const mapDispatchToProps = (dispatch) => ({
    getUser: id => dispatch(getCurrent()),
    cancel: () => dispatch(goBack()),
    save: () => dispatch(goBack()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Delete))