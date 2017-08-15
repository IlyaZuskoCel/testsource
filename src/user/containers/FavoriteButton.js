/**
 * Created by aleksandr on 8/12/17.
 * moonion.com
 */


import {connect} from 'react-redux';

import FavoriteButton from '../components/FavoriteButton';

import {addFavorite, removeFavorite} from '../actions';

const mapStateToProps = (state) => ({
    currentUser: state.user.current,
});
const mapDispatchToProps = (dispatch) => ({
    add: id => dispatch(addFavorite(id)),
    remove: id => dispatch(removeFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton)