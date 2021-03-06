// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import tableExplorer from './tableExplorer';

const rootReducer = combineReducers({
  router,
  tableExplorer
});

export default rootReducer;
