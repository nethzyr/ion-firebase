import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Item } from '../../models/item.model';

import * as itemActions from '../actions/actions';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions, private afs: AngularFirestore) {}

  @Effect()
  loadItems$: Observable<Action> = this.actions$.ofType(itemActions.QUERY).pipe(
    switchMap(() => {
      return this.afs.collection<Item>('prices').stateChanges();
    }),
    mergeMap(actions => actions),
    map(action => {
      return {
        type: `[Item] ${action.type}`,
        payload: { id: action.payload.doc.id, ...action.payload.doc.data() },
      };
    })
  );

  @Effect()
  update$: Observable<Action> = this.actions$.ofType(itemActions.UPDATE).pipe(
    map((action: itemActions.Update) => action),
    switchMap(data => {
      console.log(data);
      const ref = this.afs.doc<Item>(`prices/${data.id}`);
      return of(ref.update(data.changes));
    }),
    map(() => new itemActions.UpdateSuccess())
  );
}
