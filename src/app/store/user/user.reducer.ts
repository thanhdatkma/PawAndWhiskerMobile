import { createReducer, on } from '@ngrx/store';
import { UserState, initialUserState } from '../../models/app-state.model';
import { UserActions } from './user.actions';

export const userReducer = createReducer<UserState>(
  initialUserState,

  // ─── Profile Loading (Requirement 3 & 5) ──────────────────────────────────
  on(UserActions.loadProfile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.loadProfileSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(UserActions.loadProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ─── Update Profile ────────────────────────────────────────────────────────
  on(UserActions.updateProfile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.updateProfileSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(UserActions.updateProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ─── Auth Actions ──────────────────────────────────────────────────────────
  on(UserActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.loginSuccess, (state, { data }) => ({
    ...state,
    data,
    isLoggedIn: true,
    loading: false,
    error: null,
  })),

  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserActions.logout, (state) => ({
    ...state,
    loading: true,
  })),

  on(UserActions.logoutSuccess, () => ({
    ...initialUserState,
  })),

  // ─── Utility ───────────────────────────────────────────────────────────────
  on(UserActions.setTempNotice, (state, { message }) => ({
    ...state,
    tempNotice: message,
  })),

  on(UserActions.clearTempNotice, (state) => ({
    ...state,
    tempNotice: null,
  })),
);
