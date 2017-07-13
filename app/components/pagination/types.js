// @flow
export type ChangePageCallback = (number) => void;

export type PageState = {
  start: number,
  count: number,
  totalCount: number
};

export type PageAction = {
  type: string,
  start: number,
  count: number,
  totalCount: number
};
