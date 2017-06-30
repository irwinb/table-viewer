// @flow
type actionType = {
  type: string
};


export const CHANGE_PAGE = 'CHANGE_PAGE';
export function changePage(nextPage) {
  return {
    type: CHANGE_PAGE,
    nextPage
  };
}

export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export function incrementPage() {
  return {
    type: INCREMENT_PAGE
  };
}

export const DECREMENT_PAGE = 'DECREMENT_PAGE';
export function decrementPage() {
  return {
    type: DECREMENT_PAGE
  };
}

export const REQUEST_ENTRIES = 'REQUEST_ENTRIES';
export function requestEntries(table, page, entriesPerPage) {
  return {
    type: REQUEST_ENTRIES,
    table,
    page,
    entriesPerPage
  }
}

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export function receiveEntries(table, page, json) {
  return {
    type: RECEIVE_ENTRIES,
    page,
    json
  };
};