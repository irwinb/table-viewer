// @flow
import type {
  PageState,
  PageAction
} from './types';
import type {
  BaseAction
} from '../common/types';

type Action =
  | BaseAction
  | PageAction;

function page(state: PageState = {
  start: 0,
  count: 0,
  totalCount: 0
}, action: Action) {
  switch (action.type) {
    
  }
}