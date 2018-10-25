import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Item } from '../../models/item.model';

import * as itemActions from '../actions/actions';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions, private afs: AngularFirestore) {}

  @Effect()
  loadItems$: Observable<Action> = this.actions$
    .ofType(itemActions.LOAD_ITEMS)
    .pipe(
      switchMap(() => {
        return this.afs.collection<Item>('prices').stateChanges();
      }),
      mergeMap(actions => actions),
      map(action => {
        return {
          type: itemActions.LOAD_ITEMS_SUCCESS,
          payload: { id: action.payload.doc.id, ...action.payload.doc.data() },
        };
      })
    );
}
