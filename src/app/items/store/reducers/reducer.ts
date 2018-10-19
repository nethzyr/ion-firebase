import { Action } from '@ngrx/store';
import { Item } from '../../models/item.model';
import * as fromAction from '../actions/index';

export interface ItemState {
  entities: { [id: number]: Item };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ItemState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case fromAction.LOAD_ITEMS: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
}