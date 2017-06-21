// @flow
import { CHANGE_PAGE, INCREMENT_PAGE, DECREMENT_PAGE } from '../actions/table';

export type tableStateType = {
  table: object
};

type actionType = {
  type: string
};

/**
 * 

{
  currentPage: 1, // Current page
  entriesPerPage: 10,
  totalEntries: 1000,
  entries: [
  ]
}

 * Reducer that takes an action that contains:
 * type      the action type.
 * nextPage  the page to change to, if type is CHANGE_PAGE
 */
export function page(state: number = 1, action: actionType) {
  switch (action.type) {
    case CHANGE_PAGE:
      return action.nextPage;
    case INCREMENT_PAGE:
      return state + 1;
    case DECREMENT_PAGE:
      return state <= 1 
          ? state
          : state - 1;
    default return state;
  }
}

export function entries(state: array = [], action: actionType) {
  switch (action.type) {
    case CHANGE_PAGE:
    default return state;
  }
}

export default function table(state: object = {}, action: actionType) {
  switch (action.type) {
    case CHANGE_PAGE:
    case INCREMENT_PAGE:
    case DECREMENT_PAGE:
      state = {...,
        page: page(state.page, action.type)
      };
      state.entries = entries(state.entries, {
        type: CHANGE_PAGE,
        page: state.page
      });
      return state;
    default:
      return state;
  }
};