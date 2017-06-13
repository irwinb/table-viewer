// @flow
import { CHANGE_PAGE, INCREMENT_PAGE, DECREMENT_PAGE } from '../actions/table';

export type tableStateType = {
  table: object
};

type actionType = {
  type: string
};

export default function table(state: object = {}, action: actionType) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
};