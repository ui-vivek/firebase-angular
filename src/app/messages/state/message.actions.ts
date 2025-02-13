import { createAction, props } from '@ngrx/store';

export const submitMessage = createAction(
  '[Message] Submit Message',
  props<{ email: string; message: string }>()
);

export const submitMessageSuccess = createAction(
  '[Message] Submit Message Success'
);

export const submitMessageFailure = createAction(
  '[Message] Submit Message Failure',
  props<{ error: any }>()
);

export const loadMessages = createAction('[Message] Load Messages');

export const loadMessagesSuccess = createAction(
  '[Message] Load Messages Success',
  props<{ messages: any[] }>()
);

export const loadMessagesFailure = createAction(
  '[Message] Load Messages Failure',
  props<{ error: any }>()
);
