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
        entities: [...state.entities, action.payload],
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
