/**
 * Created by kirill on 7/21/17.
 * moonion.com
 */

import {combineReducers} from 'redux';

import test from './test';
import people from './people'
import options from './options'
import headers from './headers'
import filters from './filters'



export default combineReducers({
    test: test,
    people: people,
    options: options,
    headers: headers,
    filters: filters,
});
