import { EntityState } from '@ngrx/entity';
import { ActionReducerMap } from '@ngrx/store';
import { Item } from '../../models/item.model';

import * as fromReducer from './reducer';

export interface AppState {
  items: EntityState<Item>;
}

export const reducers: ActionReducerMap<AppState> = {
  items: fromReducer.reducer,
};
