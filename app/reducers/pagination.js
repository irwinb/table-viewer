// @flow
import type {
  BaseAction
} from '../actions';
import type {
  PaginationActionType
} from '../actions/pagination';
import {
  UPDATE_PAGINATION
} from '../actions/pagination';
import config from '../config';

type Action =
  | BaseAction
  | PaginationActionType;

export type PaginationState = {
  start: number,
  countPerPage: number
};

const defaultCountPerPage = config.get('defaultCountPerPage');

export default function pagination(state: PaginationState = {
  start: 0,
  countPerPage: defaultCountPerPage
}, action: BaseAction) {
  switch (action.type) {
    case UPDATE_PAGINATION: {
      const pageAction = (action: PaginationActionType);
      return { ...state,
        start: pageAction.start
      };
    }
    default:
      return state;
  }
}
