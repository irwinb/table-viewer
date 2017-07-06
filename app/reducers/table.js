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

export type Data = {
  rows:              Array,
  continuationToken: ?string
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

type DataAction = {
  type:     string,
  page:     number
};

type Metadata = {
  name:           ?string,
  rowsPerPage: number
};

type MetadataAction = {
  type:           string,
  name:           string,
  rowsPerPage: number
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
  | DataAction
  | MetadataAction
  | StatusAction;

// const config = new Conf();
// TODO use a config that works
const configDictionary = {
  'table.rowsPerPage': 1000
};

const config = {
  get(key) {
    return configDictionary[key];
  }
};

const rowsPerPage = config.get('table.rowsPerPage');

function data(state: Data = {
  rows: [],
  continuationToken: null
}, action: Action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        rows: [...state.rows, action.rows],
        continuationToken: action.continuationToken
      });
    default:
      return state;
  }
}

function currentPage(state: PageState = {
  start: 0,
  count: 0
}, action: Action) {
  switch (action.type) {
    case UPDATE_PAGE:
      return Object.assign({}, state, {
        start: action.start,
        count: action.count
      });
    default:
      return state;
  }
}

function metadata(state: Metadata = {
  name: null,
  rowsPerPage
}, action: Action) {
  switch (action.type) {
    case UPDATE_TABLE:
      return Object.assign({}, state, {
        name: action.name,
        rowsPerPage: action.rowsPerPage
      });
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
  data,
  currentPage,
  metadata,
  status
});

export default table;