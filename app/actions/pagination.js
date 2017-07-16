// @flow
type PaginationActionType = {
  type: string,
  start: number
};

export const CHANGE_PAGE = 'CHANGE_PAGE';
export function changePage(
  start: number): PaginationActionType {
  return {
    type: CHANGE_PAGE,
    start
  };
}
