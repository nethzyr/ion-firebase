import { ActionReducerMap } from '@ngrx/store';

import * as fromItems from './reducer';

export interface AppState {
  items: fromItems.ItemsState;
}

export const reducers: ActionReducerMap<AppState> = {
  items: fromItems.reducer,
};
