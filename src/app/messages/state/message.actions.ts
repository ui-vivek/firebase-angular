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
  props<{ error: string }>()
);
