/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Profile from '../components/Profile';

import {getUser, sendEmail, getCurrent} from '../actions';
import {goBack} from '../../common/actions';

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    id: props.match.params.id || state.user.current.id,
    isCurrent: state.user.current && state.user.user && state.user.user.id === state.user.current.id
});
const mapDispatchToProps = (dispatch) => ({
    fetchData: id => {
        dispatch(getCurrent());
        dispatch(getUser(id));
    },
    sendEmail: (id, subject, text) => dispatch(sendEmail(id, subject, text)),
    goBack: () => dispatch(goBack()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))