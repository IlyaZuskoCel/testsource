import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import {
    uploadPlayers,
    uploadScouts,
    filterScouts,
    filterPlayers,
    setFilters,
    clearFilters,
    fetchLevels
} from '../actions';
import {addFavorite, removeFavorite} from "../../user/actions/index";
import {
    go,
    getCountries,
    getLeagues,
    getTeams,
    showHeaderBackground,
    hideHeaderBackground,
    showFooter,
    hideFooter
} from '../../common/actions';

import {mapOptions, map} from '../selectors';

import Search from '../components/Search';

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    results: state.search.people,
    countries: map(state.common.countries),
    countryOptions: mapOptions(state.common.countries),
    leagues: map(state.common.leagues),
    leagueOptions: mapOptions(state.common.leagues, item => item.name + ' ' + item.short_name),
    teams: map(state.common.teams),
    teamOptions: mapOptions(state.common.teams),
    type: props.match.params.type || 'player',
    query: props.location.search,
    headers: state.search.headers,
    filters: state.search.filters,
    levelOptions: state.search.levels && state.search.levels.length > 0 ? mapOptions(state.search.levels) : [],
    levels: state.search.levels ? map(state.search.levels) : null,
});


const mapDispatchToProps = (dispatch, props) => ({
    upload: (page, params) => page && page === 'scout' ? dispatch(uploadScouts(params)) : dispatch(uploadPlayers(params)),
    uploadPlayers: (params) => dispatch(uploadPlayers(params)),
    uploadScouts: (params) => dispatch(uploadScouts(params)),
    fetchData: () => {
        dispatch(getCountries());
        dispatch(getLeagues());
        dispatch(getTeams());
        dispatch(fetchLevels());
    },
    go: (url) => dispatch(go(url)),
    getLeagues: () => {
        dispatch(getLeagues())
    },
    filterScouts: (params) => dispatch(filterScouts(params)),
    filterPlayers: (params) => dispatch(filterPlayers(params)),
    addFavorite: (playerId) => dispatch(addFavorite(playerId)),
    removeFavorite: (playerId) => dispatch(removeFavorite(playerId)),
    setFilters: (filters, type) => dispatch(setFilters(filters, type)),
    clearFilters: () => dispatch(clearFilters()),
    showHeaderBackground: () => dispatch(showHeaderBackground()),
    hideHeaderBackground: () => dispatch(hideHeaderBackground()),
    showFooter: () => dispatch(showFooter()),
    hideFooter: () => dispatch(hideFooter()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))

