import { Action } from '@ngrx/store';

import { Item } from '../../models/item.model';

export const QUERY = '[Item] query Items';

export const ADDED = '[Item] added';
export const MODIFIED = '[Item] modified';
export const REMOVED = '[Item] removed';

export const UPDATE = '[Item] update';
export const UPDATE_SUCCESS = '[Item] update success';

export class Query implements Action {
  readonly type = QUERY;
}

export class Added implements Action {
  readonly type = ADDED;
  constructor(public payload: Item) {}
}

export class Modified implements Action {
  readonly type = MODIFIED;
  constructor(public payload: Item) {}
}

export class Removed implements Action {
  readonly type = REMOVED;
  constructor(public payload: Item) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: Item) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
}

export type ItemActions =
  | Query
  | Added
  | Modified
  | Removed
  | Update
  | UpdateSuccess;
