import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './message/message.component';
import { StoreModule } from '@ngrx/store';
import { messageReducer } from './state/message.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MessageEffects } from './state/message.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MessagesComponent }]),
    // StoreModule.forFeature('messages', messageReducer),
    // EffectsModule.forFeature([MessageEffects]),
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
})
export class MessagesModule { }
