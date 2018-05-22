/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import SignScoutForm from '../components/Sign/ScoutForm';

import {registerScout} from '../actions';
import {getLevels, getLeagues, getTeams, getCountries} from '../../common/actions';

import {map, mapOptions,} from '../selectors'

const mapStateToProps = (state) => ({
    countries: map(state.common.countries),
    countryOptions: mapOptions(state.common.countries),
    levels: state.common.levels,
    leagues: {'-1': 'My League isn\'t listed', ...map(state.common.leagues)},
    leagueOptions: [{
        label: 'My League isn\'t listed',
        value: '-1'
    }, ...mapOptions(state.common.leagues, item => item.name + ' ' + item.short_name)],
    teams: {'-1': 'My Team isn\'t listed', ...map(state.common.teams)},
    teamOptions: [{label: 'My Team isn\'t listed', value: '-1'}, ...mapOptions(state.common.teams)],
    token: state.common.cookies.token
});
const mapDispatchToProps = (dispatch) => ({
    register: (user, token) => dispatch(registerScout(user, token)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    register: (user) => dispatchProps.register(user, stateProps.token),
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        const state = store.getState();
        return await Promise.all([
            store.dispatch(getCountries(state.common.cookies.token)),
            store.dispatch(getLevels(state.common.cookies.token)),
            store.dispatch(getLeagues(state.common.cookies.token)),
            store.dispatch(getTeams(state.common.cookies.token)),
        ])
    };

    render() {

        return <SignScoutForm {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Wrap);

export default withWrapper(Wrap);