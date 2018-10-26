import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ItemsEffects } from './store/effects/effects';

import * as fromReducer from './store/reducers/reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('items', fromReducer.reducer),
    EffectsModule.forFeature([ItemsEffects]),
  ],
})
export class ItemModule {}
