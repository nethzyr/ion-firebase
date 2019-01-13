import { Action } from '@ngrx/store';

export const LOAD_ITEMS = '[Items] Load Items';
export const LOAD_ITEMS_FAIL = '[Items] Load Items Fail';
export const LOAD_ITEMS_SUCCESS = '[Items] Load Items Success';

export class LoadItems implements Action {
  readonly type = LOAD_ITEMS;
}

export class LoadItemsFail implements Action {
  readonly type = LOAD_ITEMS_FAIL;
  constructor(public payload: string) {}
}

export class LoadItemsSuccess implements Action {
  readonly type = LOAD_ITEMS_SUCCESS;
  constructor(public payload: any) {}
}

export type ItemAction = LoadItems | LoadItemsFail | LoadItemsSuccess;
