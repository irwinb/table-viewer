// @flow
import {
  REQUEST_ENTRIES,
  RECEIVE_ENTRIES,
  RECEIVE_ENTRIES_FAILURE,
  UPDATE_PAGE,
  UPDATE_TABLE,
} from '../actions/table'
import { combineReducers } from 'redux'
import Conf from 'conf'

type BaseAction = {
  type: string
};

type Entries = {
  rows:              Array,
  continuationToken: ?string
}

type PageState = {
  start: number,
  count: number
};

 type Table = {
  entries:        Array,
  page:           PageState,
  name:           string,
  entriesPerPage: number,
  isFetching:     bool
};

type PageAction = {
  type:  string,
  start: number,
  count: number
};

type EntriesAction = {
  type:     string,
  page:     number
};

type Metadata = {
  name:           ?string,
  entriesPerPage: number
};

type MetadataAction = {
  type:           string,
  name:           string,
  entriesPerPage: number
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
  | EntriesAction
  | MetadataAction
  | StatusAction;

// const config = new Conf();
// TODO use a config that works
const configDictionary = {
  'table.entriesPerPage': 1000
};

const config = {
  get(key) {
    return configDictionary[key];
  }
};

const entriesPerPage = config.get('table.entriesPerPage');

function entries(state: Entries = {
  rows: [],
  continuationToken: null
}, action: Action) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
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
  entriesPerPage
}, action: Action) {
  switch (action.type) {
    case UPDATE_TABLE:
      return Object.assign({}, state, {
        name: action.name,
        entriesPerPage: action.entriesPerPage
      });
    default:
      return state;
  }
}

function status(state: Status = {
  isFetching: false
}, action: Action) {
  switch (action.type) {
    case REQUEST_ENTRIES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_ENTRIES:
    case RECEIVE_ENTRIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}

const table = combineReducers({
  entries,
  currentPage,
  metadata,
  status
});

export default table;