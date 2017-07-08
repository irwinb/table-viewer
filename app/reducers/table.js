// @flow
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_DATA_FAILURE,
  UPDATE_PAGE,
  UPDATE_TABLE,
} from '../actions/table'
import { combineReducers } from 'redux'
import Conf from 'conf'

type BaseAction = {
  type: string
};

type PageState = {
  start: number,
  count: number
};

type PageAction = {
  type:  string,
  start: number,
  count: number
};

type ContinuationTokenAction = {
  type:              string,
  continuationToken: ?string
};

type NameAction = {
  type: string,
  name: ?string
};

type RowsAction = {
  type:     string,
  rows:     Array
};

type ColumnsAction = {
  type:     string,
  columns:  Array
};

type RowsPerPageAction = {
  type:           string,
  rowsPerPage:    number
};

type Status = {
  isFetching: bool
};

type StatusAction = {
  type: string,
  isFetching: bool
};

type Action =
  | BaseAction
  | PageAction
  | RowsAction
  | NameAction
  | RowsPerPageAction
  | StatusAction;

// const config = new Conf();
// TODO use a config that works
const configDictionary = {
  'table.defaultRowsPerPage': 1000
};

const config = {
  get(key) {
    return configDictionary[key];
  }
};

const defaultRowsPerPage = config.get('table.defaultRowsPerPage');

function rows(state: Array = [], action: Action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return [...rows, action.rows];
    default:
      return state;
  }
}

function columns(state: Array = [], action: Action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return [...columns, action.columns];
    default:
      return state;
  }
}

function continuationToken(state: ?string = null, action: Action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.continuationToken;
    default:
      return state
  }
}

function page(state: PageState = {
  start: 0,
  count: 0
}, action: Action) {
  switch (action.type) {
    case UPDATE_PAGE:
      console.log(`change page! ${JSON.stringify(state)}`);
      return Object.assign({}, state, {
        start: action.start,
        count: action.count
      });
    default:
      return state;
  }
}

function rowsPerPage(
  state: number = defaultRowsPerPage, 
  action: Action) {
  switch (action.type) {
    case UPDATE_TABLE:
      return action.rowsPerPage;
    default:
      return state;
  }
}

function name(state: ?string = null, action: Action) {
  switch (action.type) {
    case UPDATE_TABLE:
      return action.name;
    default:
      return state;
  }
}

function status(state: Status = {
  isFetching: false
}, action: Action) {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_DATA:
    case RECEIVE_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}

const table = combineReducers({
  rows,
  columns,
  page,
  rowsPerPage,
  name,
  status,
  continuationToken
});

export default table;