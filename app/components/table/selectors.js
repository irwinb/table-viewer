// @flow
import { createSelector } from 'reselect';
import type { PageState } from './reducers';
import type { RowData } from './types';

const getPage = (state): PageState => state.table.page;
const getRows = (state): Array<RowData> => state.table.rows;

const getCurrentPageRows = createSelector(
  [getPage, getRows],
  (page, rows) => rows.slice(page.start, page.count)
);

export default getCurrentPageRows;
