/**
 * Created by aleksandr on 8/12/17.
 * moonion.com
 */


import {connect} from 'react-redux';

import FavoriteButton from '../components/FavoriteButton';

import {addFavorite, removeFavorite} from '../actions';

const mapStateToProps = (state) => ({
    currentUser: state.user.current,
    token: state.common.cookies.token,
});
const mapDispatchToProps = (dispatch) => ({
    add: (id, token) => dispatch(addFavorite(id, token)),
    remove: (id, token) => dispatch(removeFavorite(id, token)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    add: id =>  dispatchProps.add(id, stateProps.token),
    remove: id => dispatchProps.remove(id, stateProps.token),
});
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FavoriteButton)