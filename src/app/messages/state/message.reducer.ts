import { createReducer, on } from '@ngrx/store';
import * as MessageActions from './message.actions';

export interface MessageState {
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  loading: false,
  error: null,
};

export const messageReducer = createReducer(
  initialState,
  on(MessageActions.submitMessage, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MessageActions.submitMessageSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(MessageActions.submitMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
