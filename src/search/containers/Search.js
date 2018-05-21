import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
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
    hideFooter,
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
    token: state.common.cookies.token
});


const mapDispatchToProps = (dispatch, props) => ({
    upload: (page, params, token) => page && page === 'scout' ? dispatch(uploadScouts(params, token)) : dispatch(uploadPlayers(params, token)),
    uploadPlayers: (params) => dispatch(uploadPlayers(params)),
    uploadScouts: (params) => dispatch(uploadScouts(params)),
    go: (url) => dispatch(go(url)),
    getLeagues: () => {
        dispatch(getLeagues())
    },
    filterScouts: (params, token) => dispatch(filterScouts(params, token)),
    filterPlayers: (params, token) => dispatch(filterPlayers(params, token)),
    addFavorite: (playerId, token) => dispatch(addFavorite(playerId, token)),
    removeFavorite: (playerId, token) => dispatch(removeFavorite(playerId, token)),
    setFilters: (filters, type) => dispatch(setFilters(filters, type)),
    clearFilters: () => dispatch(clearFilters()),
    showHeaderBackground: () => dispatch(showHeaderBackground()),
    hideHeaderBackground: () => dispatch(hideHeaderBackground()),
    showFooter: () => dispatch(showFooter()),
    hideFooter: () => dispatch(hideFooter()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    upload: (page, params) => dispatchProps.upload(page, params, stateProps.token),
    filterScouts: (params) =>  dispatchProps.filterScouts(params, stateProps.token),
    filterPlayers: (params) => dispatchProps.filterPlayers(params, stateProps.token),
    addFavorite: (playerId) => dispatchProps.addFavorite(playerId, stateProps.token),
    removeFavorite: (playerId) => dispatchProps.removeFavorite(playerId, stateProps.token),
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store, routeProps}) {
        const state = store.getState();
        return await Promise.all([
                store.dispatch(uploadPlayers({page: 1, 'per-page': 18}, state.common.cookies.token)),
                store.dispatch(getCountries(state.common.cookies.token)),
                store.dispatch(getLeagues(state.common.cookies.token)),
                store.dispatch(getTeams(state.common.cookies.token)),
                store.dispatch(fetchLevels(state.common.cookies.token)),
        ])
    };

    render() {

        return <Search {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Wrap);

export default withWrapper(Wrap);
