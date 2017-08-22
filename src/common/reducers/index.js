/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {combineReducers} from 'redux';

import load from './load';
import alert from './alert';
import leagues from './leagues';
import teams from './teams';

export default combineReducers({
    load,
    alert,
    leagues,
    teams,
});
