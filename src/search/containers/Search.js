
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import {uploadPlayers, uploadScouts , getLeagues, filterScouts} from '../actions';
import {go} from '../../common/actions';


import Search from '../components/Search';

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    results : state.search.people,
    leagues: state.search.options.leagues,
    type: props.match.params.type || 'player',
});

const mapDispatchToProps = (dispatch , props) => ({
        upload: (page , params , requestBody) => page && page === 'scout' ? dispatch(uploadScouts(params, requestBody)) : dispatch(uploadPlayers(params, requestBody)),
        uploadPlayers: (params) => dispatch(uploadPlayers(params)),
        uploadScouts: (params) => dispatch(uploadScouts(params)),
        getLeagues: () => dispatch(getLeagues()),
        go: (url) => dispatch(go(url)),
        filterScouts: (params , requestBody , queryString) => dispatch(filterScouts(params , requestBody , queryString)),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))