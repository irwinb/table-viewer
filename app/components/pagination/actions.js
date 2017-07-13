// @flow
import type { PageAction } from './types';

export const UPDATE_PAGE = '';
export function page(start: number, count: number, totalCount: number): PageAction {
  return {
    type: UPDATE_PAGE,
    start,
    count,
    totalCount
  };
}
