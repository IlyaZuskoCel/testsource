import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import {uploadPlayers, uploadScouts, filterScouts, filterPlayers , follow} from '../actions';
import {go, getLeagues, getTeams} from '../../common/actions';

import {mapOptions, map} from '../selectors';

import Search from '../components/Search';

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    results: state.search.people,
    leagues: map(state.common.leagues),
    leagueOptions: mapOptions(state.common.leagues),
    teams: map(state.common.teams),
    teamOptions: mapOptions(state.common.teams),
    type: props.match.params.type || 'player',
    query: props.location.search,
    headers: state.search.headers,
});


const mapDispatchToProps = (dispatch, props) => ({
    upload: (page, params) => page && page === 'scout' ? dispatch(uploadScouts(params)) : dispatch(uploadPlayers(params)),
    uploadPlayers: (params) => dispatch(uploadPlayers(params)),
    uploadScouts: (params) => dispatch(uploadScouts(params)),
    fetchData: () => {
        dispatch(getLeagues());
        dispatch(getTeams());
    },
    go: (url) => dispatch(go(url)),
    filterScouts: (params) => dispatch(filterScouts(params)),
    filterPlayers: (params) => dispatch(filterPlayers(params)),
    follow: (player) => dispatch(follow(player)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))

