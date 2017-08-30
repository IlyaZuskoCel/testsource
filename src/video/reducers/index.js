/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */

import {combineReducers} from 'redux';

import video from './video';
import tags from './tags';


export default combineReducers({
    video,
    tags,

});
