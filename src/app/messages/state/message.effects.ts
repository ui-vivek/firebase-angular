import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as MessageActions from './message.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private firestore: Firestore,
    private snackBar: MatSnackBar
  ) {}

  submitMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.submitMessage),
      mergeMap(({ email, message }) =>
        addDoc(collection(this.firestore, 'messages'), { email, message, date: new Date() }).then(() => {
          this.snackBar.open('Message sent successfully!', 'Close', { duration: 3000 });
          return MessageActions.submitMessageSuccess();
        }).catch((error) => {
          this.snackBar.open('Failed to send message.', 'Close', { duration: 3000 });
          return MessageActions.submitMessageFailure({ error: error.message });
        })
      )
    )
  );
}
