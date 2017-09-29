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
        dispatch(getLeagues());
        dispatch(getTeams());
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignScoutForm))