// @flow
import createTableStorageClient from './table/tableStorageClient'
import Promise from 'bluebird'

const tableStorageClient = createTableStorageClient();

type actionType = {
  type: string
};

export const CHANGE_TABLE = 'CHANGE_TABLE';
export function updateTable(name) {
  return {
    type: CHANGE_TABLE,
    name
  }
}

export const UPDATE_TABLE = 'UPDATE_TABLE';
export function updateTable(entriesPerPage) {
  return {
    type: UPDATE_TABLE,
    entriesPerPage
  }
}

export const UPDATE_PAGE = 'UPDATE_PAGE';
export function updatePage(start, count) {
  return {
    type: UPDATE_PAGE,
    start,
    count
  }
}

export const REQUEST_ENTRIES = 'REQUEST_ENTRIES';
export function requestEntries() {
  return {
    type: REQUEST_ENTRIES,
    table
  }
}

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export function receiveEntries(data) {
  return {
    type: RECEIVE_ENTRIES,
    data
  }
}

export const RECEIVE_ENTRIES_FAILURE = 'RECEIVE_ENTRIES_FAILURE';
export function receiveEntriesFailure(error) {
  return {
    type: RECEIVE_ENTRIES_FAILURE,
    error
  }
}

function needToFetchMoreEntries(entries, start, count) {
  return !(start + count < entries.length);
}

function canFetchMoreEntries(continuationToken) {
  return continuationToken && continuationToken.length > 0;
}

/**
 * @param {number} start position of the first element. zero-indexed.
 */
export function tryUpdatePage(start) {
  return (dispatch: () => mixed, getState: () => mixed) => {
    const state = getState();
    const entriesPerPage = state.metadata.entriesPerPage;

    if (start < 0) {
      return Promise.resolve();
    }

    if (!needToFetchMoreEntries(state.entries, start, entriesPerPage)) {
      dispatch(updatePage(start, entriesPerPage));
      return Promise.resolve();
    }

    if (!canFetchMoreEntries(state.continuationToken)) {
      dispatch(updatePage(start, state.entries.length - start));
      return Promise.resolve();
    }

    return tableStorageClient
      .getRows(entriesPerPage, state.continuationToken)
      .then(result => {
        console.log(JSON.stringify(result));
        dispatch(receiveEntries(data));
        dispatch(updatePage(start, entriesPerPage));
      });
  }
}