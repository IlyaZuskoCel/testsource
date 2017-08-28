/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import ScoutForm from '../components/Edit/ScoutForm';

import {goBack, getLeagues, getTeams} from '../../common/actions';
import {update, uploadPhoto} from '../actions';
import {mapOptions, map} from '../selectors';

const mapStateToProps = (state, props) => ({
    user: state.user.current,
    leagues: map(state.common.leagues),
    leagueOptions: mapOptions(state.common.leagues),
    teams: map(state.common.teams),
    teamOptions: mapOptions(state.common.teams),
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => {
        dispatch(getLeagues());
        dispatch(getTeams());
    },
    cancel: () => dispatch(goBack()),
    uploadPicture: (file) => dispatch(uploadPhoto(file)),
    save: (data) => dispatch(update(data)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScoutForm))