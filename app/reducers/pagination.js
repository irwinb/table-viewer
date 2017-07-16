// @flow
import type {
  BaseAction
} from '../actions';
import type {
  PaginationActionType
} from '../actions/pagination';
import {
  CHANGE_PAGE,
} from '../actions/pagination';
import Conf from '../conf';

type Action =
  | BaseAction
  | PaginationActionType;

export type PaginationState = {
  start: number,
  countPerPage: number,
  totalCount: number
};

const defaultCountPerPage = Conf.get('defaultCountPerPage');

export default function pagination(state: PaginationState = {
  start: 0,
  countPerPage: defaultCountPerPage,
  totalCount: 0
}, action: BaseAction) {
  switch (action.type) {
    case CHANGE_PAGE: {
      const pageAction = (action: PaginationActionType);
      return { ...state,
        start: pageAction.start
      };
    }
    default:
      return state;
  }
}
