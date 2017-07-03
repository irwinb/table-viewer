// @flow
import { 
  UPDATE_PAGE,
  REQUEST_ENTRIES,
  RECEIVE_ENTRIES,
  RECEIVE_ENTRIES_FAILURE
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
  nextPage: number
};

type entriesActionType = {
  type:     string,
  page:     number
};

const config = new Conf();
const entriesPerPage = config.get('table.entriesPerPage');

function entries(state: entriesStateType = {
  rows: [],
  continuationToken: null,
  isFetching: false
}, action: entriesActionType)

export default table = combineReducers({
  entries,
  currentPage,
  name,
  entriesPerPage,
  continuationToken,
  fetching
});

export default function table(state: tableStateType = {
  entries: [],
  currentPage: {
    start: 0,
    count: 0,
    entriesPerPage: entriesPerPage
  },
  name: null,
  continuationToken: null,
  isFetching: false
}, action: actionType) {
  // Have we initialized a table? 
  if (!state.name) {
    return state;
  }

  switch (action.type) {
    case UPDATE_PAGE:
    case REQUEST_ENTRIES:
    case RECEIVE_ENTRIES:
    case RECEIVE_ENTRIES_FAILURE:
      return state;
    default:
      return state;
  }
};