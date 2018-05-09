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
});
const mapDispatchToProps = (dispatch) => ({
    register: (user) => dispatch(registerScout(user)),
    fetchData: () => {
        dispatch(getCountries());
        dispatch(getLevels());
        dispatch(getLeagues());
        dispatch(getTeams());
    },
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        await store.dispatch(getCountries());
        await store.dispatch(getLevels());
        await store.dispatch(getLeagues());
        await store.dispatch(getTeams());
    };

    componentDidMount() {
        if (!this.props.leagues.length || !this.props.leagueOptions.length || !this.props.teams.length || !this.props.teamOptions.length)
            this.props.fetchData();
    }

    render() {

        return <SignScoutForm {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps)(Wrap);

export default withWrapper(Wrap);