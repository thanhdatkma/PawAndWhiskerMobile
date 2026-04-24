import { createReducer, on } from '@ngrx/store';
import { UserState, initialUserState } from '../../models/app-state.model';
import { UserActions } from './user.actions';

export const userReducer = createReducer<UserState>(
  initialUserState,

  on(UserActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(UserActions.loginSuccess, (state, { profile }) => ({
    ...state,
    profile,
    isLoggedIn: true,
    isLoading: false,
    error: null,
  })),

  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(UserActions.logout, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(UserActions.logoutSuccess, () => ({
    ...initialUserState,
  })),

  on(UserActions.updateProfile, (state) => ({
    ...state,
    isSubmitting: true,
    error: null,
  })),

  on(UserActions.updateProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    isSubmitting: false,
    error: null,
  })),

  on(UserActions.updateProfileFailure, (state, { error }) => ({
    ...state,
    isSubmitting: false,
    error,
  })),

  on(UserActions.setTempNotice, (state, { message }) => ({
    ...state,
    tempNotice: message,
  })),

  on(UserActions.clearTempNotice, (state) => ({
    ...state,
    tempNotice: null,
  })),
);
