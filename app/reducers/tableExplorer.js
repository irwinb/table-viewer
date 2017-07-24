// @flow
import { combineReducers } from 'redux';
import type { BaseAction } from '../actions';
import {
  RECEIVE_DATA
} from '../actions/tableExplorer';
import table from './table';
import pagination from './pagination';

type RowsAction = {
  type: string,
  rows: Array
};

type ContinuationTokenAction = {
  type: string,
  continuationToken: ?mixed
};

type Action =
  | BaseAction
  | RowsAction
  | ContinuationTokenAction;

function rows(state: Array = [], action: Action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return [...state, ...action.rows];
    default:
      return state;
  }
}

function continuationToken(state: ?mixed = null, action: Action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.continuationToken;
    default:
      return state;
  }
}

const tableExplorer = combineReducers({
  table,
  pagination,
  rows,
  continuationToken
});

export default tableExplorer;
