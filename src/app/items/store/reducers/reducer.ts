import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Item } from '../../models/item.model';
import * as fromItems from '../actions/index';

export const itemAdapter: EntityAdapter<Item> = createEntityAdapter<Item>();

export const initialState: EntityState<Item> = itemAdapter.getInitialState();

export function reducer(
  state: EntityState<Item> = initialState,
  action: fromItems.ItemActions
) {
  switch (action.type) {
    case fromItems.ADDED: {
      return itemAdapter.addOne(action.payload, state);
    }

    case fromItems.MODIFIED: {
      return itemAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    }

    case fromItems.REMOVED: {
      return itemAdapter.removeOne(action.payload.id, state);
    }

    default:
      return state;
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = itemAdapter.getSelectors();
