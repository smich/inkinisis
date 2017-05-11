import { combineReducers } from 'redux';

import trips from '../../../../trips/assets/js/reducers/trips';


const appReducers = combineReducers({
  trips,
});

export default appReducers;
