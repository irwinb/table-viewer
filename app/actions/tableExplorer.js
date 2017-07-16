// @flow
import Promise from 'bluebird';
import TableStorageClientFactory from '../data/tableStorageClient';

type ActionType = {
  type: string
};

const tableStorageClient = TableStorageClientFactory('DefaultEndpointsProtocol=https;AccountName=gggspotify;AccountKey=sWOVzABIyZGU7hmJFa0AMTAlahB3aVvObrjZ5wKswrWwJ5IbeXKgEQv4eUy7SdAJS/fD7aa/JkHn2H20EUmdpw==;EndpointSuffix=core.windows.net');

export const REQUEST_DATA = 'REQUEST_DATA';
export function requestData(): ActionType {
  return {
    type: REQUEST_DATA
  };
}

export const UPDATE_PAGE = 'UPDATE_PAGE';
export function updatePage(start: number, count: number): ActionType {
  return {
    type: UPDATE_PAGE,
    start,
    count
  };
}

export const RECEIVE_DATA = 'RECEIVE_DATA';
export function receiveData(data: any): ActionType {
  return {
    type: RECEIVE_DATA,
    data
  };
}

export const RECEIVE_DATA_FAILURE = 'RECEIVE_DATA_FAILURE';
export function receiveDataFailure(error: Error): ActionType {
  return {
    type: RECEIVE_DATA_FAILURE,
    error
  };
}

/**
 * @param {number} start position of the first element. zero-indexed.
 */
export function changePage(start: number): ((ActionType) => mixed, () => mixed) => Promise<*> {
  return (dispatch: (ActionType) => mixed, getState: () => mixed) => {
    const table = getState().table;

    if (start < 0) {
      return Promise.resolve();
    }

    if (!needToFetchMoreRows(table.rows, start, table.rowsPerPage)) {
      dispatch(updatePage(start, table.rowsPerPage));
      return Promise.resolve();
    }
    if (!canFetchMoreRows(table.continuationToken)) {
      dispatch(updatePage(start, table.rows.length - start));
      return Promise.resolve();
    }

    dispatch(requestData());

    return tableStorageClient
      .getRows(table.rowsPerPage, table.continuationToken)
      .then(result => {
        dispatch(receiveData(result));
        return dispatch(updatePage(start, table.rowsPerPage));
      });
  };
}

function needToFetchMoreRows(rows: Array<mixed>, start: number, count: number): boolean {
  return !(start + count < rows.length);
}

function canFetchMoreRows(continuationToken: ?string): boolean {
  return continuationToken != null && continuationToken.length > 0;
}
