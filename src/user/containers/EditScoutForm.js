/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import ScoutForm from '../components/Edit/ScoutForm';

import {goBack, getLevels, getCountries, getLeagues, getTeams} from '../../common/actions';
import {update, uploadPhoto, getCurrent} from '../actions';
import {mapOptions, map} from '../selectors';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
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
    cancel: () => dispatch(goBack()),
    uploadPicture: (file, token) => dispatch(uploadPhoto(file, token)),
    save: (data, token) => dispatch(update(data, token)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    uploadPicture: (file) => dispatchProps.uploadPicture(file, stateProps.token),
    save: (data) => dispatchProps.save(data, stateProps.token),
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        const state = store.getState();
        return await Promise.all([
            store.dispatch(getCountries(state.common.cookies.token)),
            store.dispatch(getLevels(state.common.cookies.token)),
            store.dispatch(getLeagues(state.common.cookies.token)),
            store.dispatch(getTeams(state.common.cookies.token)),
            store.dispatch(getCurrent(state.common.cookies.token)),
        ])
    };

    render() {

        return <ScoutForm {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Wrap);

export default withWrapper(Wrap);