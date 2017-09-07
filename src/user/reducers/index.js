/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import {combineReducers} from 'redux';

import current from './current';
import user from './user';
import shortlist from './shortlist';


export default combineReducers({
    current,
    user,
    shortlist,
});
