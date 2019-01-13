import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Item } from '../../models/item.model';
import * as fromItems from '../actions/index';

export interface ItemsState {
  entities: Array<Item>;
}

export const initialState: ItemsState = {
  entities: [],
};

export function reducer(
  state: ItemsState = initialState,
  action: fromItems.ItemAction
) {
  switch (action.type) {
    case fromItems.LOAD_ITEMS: {
      return {
        ...state,
      };
    }

    case fromItems.LOAD_ITEMS_SUCCESS: {
      return {
        ...state,
        entities: [
          ...state.entities,
          {
            ...action.payload,
          },
        ],
      };
    }

    case fromItems.LOAD_ITEMS_FAIL: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}

export const getState = createFeatureSelector('items');
export const getFirstEntity = createSelector(
  getState,
  (state: ItemsState) => state.entities[0]
);
