// @flow
import { createSelector } from 'reselect';

const getRows = (state): Array<mixed> => state.tableExplorer.rows;

const getTotalCount = createSelector(
  [getRows],
  (rows) => rows.length
);

export default getTotalCount;
