// @flow
import Promise from 'bluebird';
import DataClient from '../data';
import config from '../config';
import {
  updatePagination
} from './pagination';
import {
  updateColumns
} from './table';

type ActionType = {
  type: string
};
console.log(config.get('data.connectionString'));
const dataClient = DataClient(config.get('data.connectionString'));

export const REQUEST_DATA = 'REQUEST_DATA';
export function requestData(): ActionType {
  return {
    type: REQUEST_DATA
  };
}

export const RECEIVE_DATA = 'RECEIVE_DATA';
export function receiveData(rows: Array<mixed>, continuationToken: ?mixed): ActionType {
  return {
    type: RECEIVE_DATA,
    rows,
    continuationToken
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
    const tableExplorer = getState().tableExplorer;
    const table = tableExplorer.table;
    const countPerPage = tableExplorer.pagination.countPerPage;

    if (start < 0) {
      return Promise.resolve();
    }

    if (!needToFetchMoreRows(table.rows, start, countPerPage)) {
      dispatch(updatePagination(start));
      return Promise.resolve();
    }

    if (start !== 0 && !canFetchMoreRows(table.continuationToken)) {
      dispatch(updatePagination(start));
      return Promise.resolve();
    }

    dispatch(requestData());

    return dataClient
      .getRows(countPerPage, table.continuationToken)
      .then(result => {
        dispatch(updateColumns(Object.keys(result.rows[0])));
        dispatch(receiveData(result.rows, result.continuationToken));
        return dispatch(updatePagination(start));
      });
  };
}

function needToFetchMoreRows(rows: ?Array<mixed>, start: number, count: number): boolean {
  return rows == null || !(start + count < rows.length);
}

function canFetchMoreRows(continuationToken: ?string): boolean {
  return continuationToken != null && continuationToken.length > 0;
}
