import { createReducer, on } from '@ngrx/store';
import { HomeActions } from './home.actions';
import { createInitialApiState } from '../../models/api-state.model';
import { HomeState } from '../../models/app-state.model';

const PAGE_SIZE = 10;

export const initialState: HomeState = {
  newsFeed: createInitialApiState(),
  newsTotal: 0,
  newsOffset: 0,
  newsLoadingMore: false,
};

export const homeReducer = createReducer(
  initialState,
  on(HomeActions.loadNewsFeed, (state) => ({
    ...state,
    newsFeed: { ...state.newsFeed, loading: true, error: null },
    newsOffset: 0,
    newsLoadingMore: false,
  })),
  on(HomeActions.loadNewsFeedSuccess, (state, { newsFeed, total }) => ({
    ...state,
    newsFeed: { data: newsFeed, loading: false, error: null },
    newsTotal: total,
    newsOffset: PAGE_SIZE,
  })),
  on(HomeActions.loadNewsFeedFailure, (state, { error }) => ({
    ...state,
    newsFeed: { ...state.newsFeed, loading: false, error },
  })),
  on(HomeActions.loadMoreNewsFeed, (state) => ({
    ...state,
    newsLoadingMore: true,
  })),
  on(HomeActions.loadMoreNewsFeedSuccess, (state, { newsFeed, total }) => ({
    ...state,
    newsFeed: { data: [...(state.newsFeed.data || []), ...newsFeed], loading: false, error: null },
    newsTotal: total,
    newsOffset: state.newsOffset + PAGE_SIZE,
    newsLoadingMore: false,
  })),
  on(HomeActions.loadMoreNewsFeedFailure, (state, { error }) => ({
    ...state,
    newsLoadingMore: false,
  })),
);
