import { createReducer, on } from '@ngrx/store';
import * as MessageActions from './message.actions';

export interface MessageState {
  messages: any[];
  loading: boolean;
  error: any;
}

export const initialState: MessageState = {
  messages: [],
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
  })),
  on(MessageActions.loadMessages, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MessageActions.loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    loading: false,
    messages,
  })),
  on(MessageActions.loadMessagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
