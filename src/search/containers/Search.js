
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import {uploadPlayers, uploadScouts} from '../actions';
import {go} from '../../common/actions';


import Search from '../components/Search';


const mapStateToProps = (state,props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    results : state.search.people,
    type: props.match.params.type || 'player'
});

const mapDispatchToProps = (dispatch, props) => ({
    upload: (params) => props.match.params.type && props.match.params.type === 'scout' ? dispatch(uploadScouts(params)) : dispatch(uploadPlayers(params)),
    uploadPlayers: (params) => dispatch(uploadPlayers(params)),
    uploadScouts: (params) => dispatch(uploadScouts(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))