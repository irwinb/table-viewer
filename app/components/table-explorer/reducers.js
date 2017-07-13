// @flow
import Promise from 'bluebird';
import { updatePage, requestData } from '../table/actions';

const tableStorageClient = TableStorageClientFactory(connString);

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
