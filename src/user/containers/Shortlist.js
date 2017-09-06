import {connect} from 'react-redux';
import Shortlist from '../components/Shortlist';
import {getFollowedList} from "../../search/actions/index";
import {removeFavorite} from "../actions/index";

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    results: state.search.people,
    headers: state.search.headers,
});
const mapDispatchToProps = (dispatch) => ({
    getFollowedList: () => dispatch(getFollowedList()),
    removeFavorite: (playerId) => dispatch(removeFavorite(playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shortlist);