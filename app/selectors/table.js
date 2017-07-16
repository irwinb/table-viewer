// @flow
import { createSelector } from 'reselect';
import type { PaginationState } from '../reducers/pagination';

const getPagination = (state): PaginationState => state.tableExplorer.pagination;
const getRows = (state): Array<mixed> => state.tableExplorer.rows;

const getCurrentPageRows = createSelector(
  [getPagination, getRows],
  (page, rows) => rows.slice(page.start, page.start + page.countPerPage)
);

export default getCurrentPageRows;
