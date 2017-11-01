/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import ScoutForm from '../components/Edit/ScoutForm';

import {goBack, getLevels, getCountries, getLeagues, getTeams} from '../../common/actions';
import {update, uploadPhoto} from '../actions';
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScoutForm))