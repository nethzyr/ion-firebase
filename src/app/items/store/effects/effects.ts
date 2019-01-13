import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { normalize, schema } from 'normalizr';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Item } from '../../models/item.model';

import * as itemActions from '../actions/actions';

@Injectable()
export class ItemsEffects {
  comment = new schema.Entity('comments');
  item = new schema.Entity('items', {
    comments: [this.comment],
  });

  constructor(private actions$: Actions, private afs: AngularFirestore) {}

  @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType(itemActions.LOAD_ITEMS),
    switchMap(() => {
      return this.afs.collection<Item>('prices').stateChanges();
    }),
    mergeMap(actions => actions),
    map(action => {
      const comments = [
        { id: '123', body: 'commentBody' },
        { id: '222', body: 'commentBody2' },
      ];
      const example = {
        id: action.payload.doc.id,
        ...action.payload.doc.data(),
        comments,
      };

      console.log(normalize(example, this.item));

      return {
        type: itemActions.LOAD_ITEMS_SUCCESS,
        payload: { id: action.payload.doc.id, ...action.payload.doc.data() },
      };
    })
  );
}
