/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {combineReducers} from 'redux';

import load from './load';
import alert from './alert';
import leagues from './leagues';
import teams from './teams';
import countries from './countries';
import loader from './loader';

export default combineReducers({
    load,
    alert,
    leagues,
    teams,
    countries,
    loader,
});
