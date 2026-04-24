import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../models/app-state.model';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserProfile = createSelector(
  selectUserState,
  (s) => s.profile,
);

export const selectIsLoggedIn = createSelector(
  selectUserState,
  (s) => s.isLoggedIn,
);

export const selectUserIsLoading = createSelector(
  selectUserState,
  (s) => s.isLoading,
);

export const selectUserIsSubmitting = createSelector(
  selectUserState,
  (s) => s.isSubmitting,
);

export const selectUserError = createSelector(
  selectUserState,
  (s) => s.error,
);

export const selectTempNotice = createSelector(
  selectUserState,
  (s) => s.tempNotice,
);
