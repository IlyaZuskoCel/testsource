/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import SignScoutForm from '../components/Sign/ScoutForm';

import {registerScout} from '../actions';
import {getLeagues, getTeams} from '../../common/actions';

import {map, mapOptions,} from '../selectors'

const mapStateToProps = (state) => ({
    leagues: map(state.common.leagues),
    leagueOptions: mapOptions(state.common.leagues),
    teams: map(state.common.teams),
    teamOptions: mapOptions(state.common.teams),
});
const mapDispatchToProps = (dispatch) => ({
    register: (user) => dispatch(registerScout(user)),
    fetchData: () => {
        dispatch(getLeagues());
        dispatch(getTeams());
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignScoutForm))