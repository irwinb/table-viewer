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

export type pageStateType = {
  start: number,
  count: number
};

export type tableStateType = {
  entries: array,
  page: pageStateType,
  name: string,
  entriesPerPage: number,
  continuationToken: string,
  isFetching: bool
};

type actionType = {
  type: string
};

type pageActionType = {
  type:     string,
  start: number,
  count: number
};

type entriesActionType = {
  type:     string,
  page:     number
};

type metadataType = {
  name: string,
  entriesPerPage: number
};

type metadataActionType = {
  type: string,
  name: string,
  entriesPerPage: number
};

type statusType = {
  isFetching: bool
};

type statusActionType = {
  type: string,
  isFetching: bool
};

const config = new Conf();
const entriesPerPage = config.get('table.entriesPerPage');

function entries(state: entriesStateType = {
  rows: [],
  continuationToken: null
}, action: entriesActionType) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return Object.assign({}, state, {
        rows: [...state.rows, action.rows],
        action.continuationToken
      });
    default:
      return state;
  }
}

function currentPage(state: pageStateType = {
  start: 0,
  count: 0
}, action: pageActionType) {
  switch (action.type) {
    case UPDATE_PAGE:
      return Object.assign({}, state, {
        action.start,
        action.count
      });
    default:
      return state;
  }
}

function metadata(state: metadataType = {
  name: null,
  entriesPerPage
}, action: metadataActionType) {
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

function status(state: statusType = {
  isFetching: false
}, action: statusActionType) {
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

export default table = combineReducers({
  entries,
  currentPage,
  metadata,
  status
});