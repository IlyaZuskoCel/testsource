import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import {uploadPlayers, uploadScouts, filterScouts, filterPlayers , setFilters , clearFilters, fetchLevels } from '../actions';
import {addFavorite , removeFavorite} from "../../user/actions/index";
import {go, getLeagues, getTeams, fetchLeagueByLevel} from '../../common/actions';

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
    filters: state.search.filters,
    levelOptions: state.search.levels && state.search.levels.length > 0 ? mapOptions(state.search.levels) : [],
    levels: state.search.levels? map(state.search.levels) : null,
    allLeagues: map(state.search.options),
});


const mapDispatchToProps = (dispatch, props) => ({
    upload: (page, params) => page && page === 'scout' ? dispatch(uploadScouts(params)) : dispatch(uploadPlayers(params)),
    uploadPlayers: (params) => dispatch(uploadPlayers(params)),
    uploadScouts: (params) => dispatch(uploadScouts(params)),
    fetchData: () => {
        dispatch(getLeagues());
        dispatch(getTeams());
        dispatch(fetchLevels());
    },
    go: (url) => dispatch(go(url)),
    getLeagues: () => {dispatch(getLeagues())},
    filterScouts: (params) => dispatch(filterScouts(params)),
    filterPlayers: (params) => dispatch(filterPlayers(params)),
    addFavorite: (playerId) => dispatch(addFavorite(playerId)),
    removeFavorite: (playerId) => dispatch(removeFavorite(playerId)),
    setFilters: (filters) => dispatch(setFilters(filters)),
    clearFilters: () => dispatch(clearFilters()),
    fetchLeagueByLevel: (id) => dispatch(fetchLeagueByLevel(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))

