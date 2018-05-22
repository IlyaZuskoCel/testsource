/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {combineReducers} from 'redux';

import load from './load';
import alert from './alert';
import levels from './levels';
import leagues from './leagues';
import teams from './teams';
import countries from './countries';
import loader from './loader';
import header from './header';
import footer from './footer';
import cookies from './cookies';

export default combineReducers({
    load,
    alert,
    levels,
    leagues,
    teams,
    countries,
    loader,
    header,
    footer,
    cookies,
});
