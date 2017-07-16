// @flow
import { combineReducers } from 'redux';
import type { BaseAction } from '../actions';
import {
  UPDATE_COLUMNS,
} from '../actions/table';

type ColumnsAction = {
  type: string,
  columns: Array<string>
};

type Action =
  | BaseAction
  | ColumnsAction;


function columns(state: Array<string> = [], action: Action) {
  switch (action.type) {
    case UPDATE_COLUMNS:
      return action.columns;
    default:
      return state;
  }
}

const table = combineReducers({
  columns
});

export default table;
