// message.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MessageState } from './message.reducer';

export const selectMessageState = createFeatureSelector<MessageState>('message');

export const selectLoading = createSelector(
  selectMessageState,
  (state: MessageState) => state.loading
);

export const selectError = createSelector(
  selectMessageState,
  (state: MessageState) => state.error
);
