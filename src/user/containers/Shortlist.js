import {connect} from 'react-redux';
import Shortlist from '../components/Shortlist';
import {removeFavorite} from "../actions/index";
import {getFollowedList} from "../actions/index";

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    results: state.user.shortlist,
    headers: state.search.headers,
});
const mapDispatchToProps = (dispatch) => ({
    getFollowedList: () => dispatch(getFollowedList()),
    removeFavorite: (playerId) => dispatch(removeFavorite(playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shortlist);