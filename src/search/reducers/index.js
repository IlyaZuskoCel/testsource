/**
 * Created by kirill on 7/21/17.
 * moonion.com
 */

import {combineReducers} from 'redux';

import test from './test';
import people from './people'
import headers from './headers'
import filters from './filters'
import levels from './levels';

export default combineReducers({
    test: test,
    people: people,
    headers: headers,
    filters: filters,
    levels: levels,
});
