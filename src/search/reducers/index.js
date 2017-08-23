/**
 * Created by kirill on 7/21/17.
 * moonion.com
 */

import {combineReducers} from 'redux';

import test from './test';
import people from './people'



export default combineReducers({
    test: test,
    people: people,
});
