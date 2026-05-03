import { createReducer, on } from '@ngrx/store';
import { UserState, initialUserState } from '../../models/app-state.model';
import { UserActions } from './user.actions';

export const userReducer = createReducer<UserState>(
  initialUserState,

  on(UserActions.loadProfile, (state) => ({ ...state, loading: true, error: null })),
  on(UserActions.loadProfileSuccess, (state, { data }) => ({ ...state, data, loading: false, error: null })),
  on(UserActions.loadProfileFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UserActions.updateProfile, (state) => ({ ...state, loading: true, error: null })),
  on(UserActions.updateProfileSuccess, (state, { data }) => ({ ...state, data, loading: false, error: null })),
  on(UserActions.updateProfileFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UserActions.updateAvatar, (state) => ({ ...state, loading: true, error: null })),
  on(UserActions.updateAvatarSuccess, (state, { avatar_url }) => ({
    ...state,
    data: state.data ? { ...state.data, avatar: avatar_url } : state.data,
    loading: false,
    error: null,
  })),
  on(UserActions.updateAvatarFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UserActions.register, (state) => ({ ...state, loading: true, error: null })),
  on(UserActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(UserActions.registerFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UserActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(UserActions.loginSuccess, (state, { data }) => ({
    ...state,
    data,
    isLoggedIn: true,
    loading: false,
    error: null,
  })),
  on(UserActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UserActions.logout, (state) => ({ ...state, loading: true })),
  on(UserActions.logoutSuccess, () => ({ ...initialUserState })),

  on(UserActions.restoreSession, (state, { data }) => ({
    ...state,
    data,
    isLoggedIn: true,
    loading: false,
    error: null,
  })),

  on(UserActions.setTempNotice, (state, { message }) => ({ ...state, tempNotice: message })),
  on(UserActions.clearTempNotice, (state) => ({ ...state, tempNotice: null })),
);
