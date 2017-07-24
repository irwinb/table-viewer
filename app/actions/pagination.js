// @flow
export type PaginationActionType = {
  type: string,
  start: number
};

export const UPDATE_PAGINATION = 'UPDATE_PAGINATION';
export function updatePagination(
  start: number): PaginationActionType {
  return {
    type: UPDATE_PAGINATION,
    start
  };
}
