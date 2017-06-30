// @flow
import { CHANGE_PAGE, INCREMENT_PAGE, DECREMENT_PAGE } from '../actions/table';
import createTableStorageClient from './table/tableStorageClient';

export type tableStateType = {
  table: object
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

const tableStorageClient = createTableStorageClient();

/**
 * 

 * Reducer that takes an action that contains:
 * type      the action type.
 * nextPage  the page to change to, if type is CHANGE_PAGE
 */
function page(state: number = 1, action: pageActionType) {
  switch (action.type) {
    case CHANGE_PAGE:
      return action.nextPage;
    case INCREMENT_PAGE:
      return state + 1;
    case DECREMENT_PAGE:
      return state <= 1 
          ? state
          : state - 1;
    default:
     return state;
  }
}

function entries(state: array = [], action: entriesActionType) {
  switch (action.type) {
    case CHANGE_PAGE:
    default:
     return state;
  }
}

export default function table(state: object = {
  page: 1,
  entries: []
}, action: actionType) {
  switch (action.type) {
    case CHANGE_PAGE:
    case INCREMENT_PAGE:
    case DECREMENT_PAGE:
      state = Object.assign({}, state, {
        page: page(state.page, action.type)
      });
      state.entries = entries(state.entries, {
        type: CHANGE_PAGE,
        page: state.page
      });
      return state;
    default:
      return state;
  }
};