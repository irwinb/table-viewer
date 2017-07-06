// @flow
import TableStorageClientFactory from '../data/tableStorageClient'
import Promise from 'bluebird'

const connString = 'DefaultEndpointsProtocol=https;AccountName=gggspotify;AccountKey=sWOVzABIyZGU7hmJFa0AMTAlahB3aVvObrjZ5wKswrWwJ5IbeXKgEQv4eUy7SdAJS/fD7aa/JkHn2H20EUmdpw==;EndpointSuffix=core.windows.net';
const tableStorageClient = TableStorageClientFactory(connString);

type actionType = {
  type: string
};

export const CHANGE_TABLE = 'CHANGE_TABLE';
export function changeTable(name) {
  return {
    type: CHANGE_TABLE,
    name
  }
}

export const UPDATE_TABLE = 'UPDATE_TABLE';
export function updateTable(rowsPerPage) {
  return {
    type: UPDATE_TABLE,
    rowsPerPage
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

export const REQUEST_DATA = 'REQUEST_DATA';
export function requestData() {
  return {
    type: REQUEST_DATA,
    table
  }
}

export const RECEIVE_DATA = 'RECEIVE_DATA';
export function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data
  }
}

export const RECEIVE_DATA_FAILURE = 'RECEIVE_DATA_FAILURE';
export function receiveDataFailure(error) {
  return {
    type: RECEIVE_DATA_FAILURE,
    error
  }
}

function needToFetchMoreRows(rows, start, count) {
  return !(start + count < rows.length);
}

function canFetchMoreRows(continuationToken) {
  return continuationToken && continuationToken.length > 0;
}

/**
 * @param {number} start position of the first element. zero-indexed.
 */
export function changePage(start) {
  return (dispatch: () => mixed, getState: () => mixed) => {
    const table = getState().table;
    const rowsPerPage = table.metadata.rowsPerPage;

    if (start < 0) {
      return Promise.resolve();
    }

    if (!needToFetchMoreRows(table.data.rows, start, rowsPerPage)) {
      dispatch(updatePage(start, rowsPerPage));
      return Promise.resolve();
    }

    if (!canFetchMoreRows(table.data.continuationToken)) {
      dispatch(updatePage(start, table.data.rows.length - start));
      return Promise.resolve();
    }

    return tableStorageClient
      .getRows(rowsPerPage, table.data.continuationToken)
      .then(result => {
        console.log(JSON.stringify(result));
        dispatch(receiveData(result));
        dispatch(updatePage(start, rowsPerPage));
      });
  }
}