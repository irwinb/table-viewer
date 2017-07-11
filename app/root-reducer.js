// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import table from './components/table/reducers';

const rootReducer = combineReducers({
  router,
  table
});

export default rootReducer;
