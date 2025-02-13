import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from '../../services/message.service';
import * as MessageActions from './message.actions';
import {  mergeMap } from 'rxjs/operators';
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";

@Injectable()
export class MessageEffects {
  actions$ = inject(Actions);
  messageService = inject(MessageService);

  submitMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.submitMessage),
      mergeMap(({ email, message }) =>
        this.messageService.submitMessage({ email, message }).pipe(
          map(() => MessageActions.submitMessageSuccess()),
          catchError((error) =>
            of(MessageActions.submitMessageFailure({ error }))
          )
        )
      )
    )
  );

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.loadMessages),
        exhaustMap(() => {
        return this.messageService.getMessages().pipe(
            map((messages) => MessageActions.loadMessagesSuccess({ messages })),
            catchError((error) => of(MessageActions.loadMessagesFailure({ error: error.message })))
        )
    })
    )
  );
}
