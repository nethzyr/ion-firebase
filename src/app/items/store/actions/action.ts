import { Action } from '@ngrx/store';

export const LOAD_ITEMS = '[Items] Load items';

export class LoadItems implements Action {
  readonly type = LOAD_ITEMS;

  constructor(public payload: any) {}
}
