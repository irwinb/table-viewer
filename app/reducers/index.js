// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import table from './table';

const rootReducer = combineReducers({
  counter,
  router,
  table
});

export default rootReducer;
