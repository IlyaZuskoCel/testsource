/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import PlayerForm from '../components/Edit/PlayerForm';

import {goBack, getLevels, getCountries, getLeagues, getTeams} from '../../common/actions';
import {update, uploadPhoto} from '../actions';
import {mapOptions, map} from '../selectors';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
    nationalities: map(state.common.countries),
    nationalityOptions: mapOptions(state.common.countries),
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
    fetchData: () => {
        dispatch(getCountries());
        dispatch(getLevels());
        dispatch(getLeagues());
        dispatch(getTeams());
    },
    cancel: () => dispatch(goBack()),
    uploadPicture: (file) => dispatch(uploadPhoto(file)),
    save: (data) => dispatch(update(data)),
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        await store.dispatch(getCountries());
        await store.dispatch(getLevels());
        await store.dispatch(getLeagues());
        await store.dispatch(getTeams());
    };

    componentDidMount() {
        this.props.fetchData();
    }

    render() {

        return <PlayerForm {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps)(Wrap);

export default withWrapper(Wrap);