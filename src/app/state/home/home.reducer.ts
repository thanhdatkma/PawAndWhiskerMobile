import { createReducer, on } from '@ngrx/store';
import { HomeActions } from './home.actions';
import { createInitialApiState } from '../../models/api-state.model';
import { HomeState } from '../../models/app-state.model';

export const initialState: HomeState = {
  newsFeed: createInitialApiState(),
};

export const homeReducer = createReducer(
  initialState,
  on(HomeActions.loadNewsFeed, (state) => ({
    ...state,
    newsFeed: { ...state.newsFeed, loading: true, error: null }
  })),
  on(HomeActions.loadNewsFeedSuccess, (state, { newsFeed }) => ({
    ...state,
    newsFeed: { data: newsFeed, loading: false, error: null }
  })),
  on(HomeActions.loadNewsFeedFailure, (state, { error }) => ({
    ...state,
    newsFeed: { ...state.newsFeed, loading: false, error }
  }))
);
