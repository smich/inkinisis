'use strict';

import { combineReducers } from 'redux';

import trips from '../../../../trips/assets/js/reducers/trips.js';


const appReducers = combineReducers({
  trips
});

export default appReducers;
