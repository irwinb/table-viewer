// @flow
import createTableStorageClient from './table/tableStorageClient'
import Promise from 'bluebird'

const tableStorageClient = createTableStorageClient();

type actionType = {
  type: string
};

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

function shouldFetchEntries(state, start, count) {
  return !(start + count < state.entries.length);
}

function canFetchMoreEntries(state) {
  return state.continuationToken && state.continuationToken.length > 0;
}

/**
 * @param {number} start position of the first element. zero-indexed.
 */
export function changePage(start, count) {
  return (dispatch: () => mixed, getState: () => mixed) => {
    const state = getState();

    if (start < 0) {
      return Promise.resolve();
    }

    if (!shouldFetchEntries(state, start, count)) {
      dispatch(updatePage(start, count));
      return Promise.resolve();
    }

    if (!canFetchMoreEntries(state)) {
      return Promise.resolve();
    }

    return tableStorageClient
      .getRows(count, state.continuationToken)
      .then(result => {
        console.log(JSON.stringify(result));
        dispatch(receiveEntries(data));
      });
  }
}