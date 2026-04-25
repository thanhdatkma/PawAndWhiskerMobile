import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../models/app-state.model';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserProfile = createSelector(
  selectUserState,
  (s) => s.data,
);

export const selectIsLoggedIn = createSelector(
  selectUserState,
  (s) => s.isLoggedIn,
);

export const selectUserIsLoading = createSelector(
  selectUserState,
  (s) => s.loading,
);

export const selectUserError = createSelector(
  selectUserState,
  (s) => s.error,
);

export const selectTempNotice = createSelector(
  selectUserState,
  (s) => s.tempNotice,
);
