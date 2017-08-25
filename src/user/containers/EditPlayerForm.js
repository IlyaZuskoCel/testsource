/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import PlayerForm from '../components/Edit/PlayerForm';

import {goBack, getCountries, getLeagues, getTeams} from '../../common/actions';
import {update} from '../actions';
import {mapOptions, map} from '../selectors';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
    nationalities: map(state.common.countries),
    nationalityOptions: mapOptions(state.common.countries),
    leagues: map(state.common.leagues),
    leagueOptions: mapOptions(state.common.leagues),
    teams: map(state.common.teams),
    teamOptions: mapOptions(state.common.teams),
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => {
        dispatch(getCountries());
        dispatch(getLeagues());
        dispatch(getTeams());
    },
    cancel: () => dispatch(goBack()),
    save: (data) => dispatch(update(data)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayerForm))