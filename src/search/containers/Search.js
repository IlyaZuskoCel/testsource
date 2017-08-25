
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import {uploadPlayers, uploadScouts , getLeagues} from '../actions';
import {go} from '../../common/actions';


import Search from '../components/Search';

const mapStateToProps = (state,props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    results : state.search.people,
    type: props.match.params.type || 'player'
});

const mapDispatchToProps = (dispatch , props) => ({
        upload: (page , params) => page && page === 'scout' ? dispatch(uploadScouts(params)) : dispatch(uploadPlayers(params)),
        uploadPlayers: (params) => dispatch(uploadPlayers(params)),
        uploadScouts: (params) => dispatch(uploadScouts(params)),
        getLeagues: () => dispatch(getLeagues()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))