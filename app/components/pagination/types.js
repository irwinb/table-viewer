// @flow
export type ChangePageCallback = (number) => void;

export type PageState = {
  start: number,
  count: number,
  totalNumberOfRows: number
};
