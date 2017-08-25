/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {LOGIN, LOGOUT, SET_CURRENT, SET_CURRENT_PHOTO} from '../constants/actions';


function current(state = null, action) {
    switch (action.type) {
        case SET_CURRENT_PHOTO:
            return {...state, profile_picture: action.payload};
        case LOGIN:
        case SET_CURRENT:
            return {
                gender: action.payload.gender_short === 'M' ? '1' : '2',
                nationality: '1',
                position: '1',
                id_league: '1',
                id_team_current: '1',
                player_num: action.payload.jersey_number,
                ...action.payload
            };
        case LOGOUT:
            return null;
        default:
            return state;
    }
}

export default current;
