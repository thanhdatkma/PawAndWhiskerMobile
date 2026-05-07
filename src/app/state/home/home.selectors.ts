import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from '../../models/app-state.model';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectNewsFeedState = createSelector(
  selectHomeState,
  (data) => data.newsFeed
);

export const selectNewsFeed = createSelector(
  selectNewsFeedState,
  (state) => state.data || []
);

export const selectNewsFeedLoading = createSelector(
  selectNewsFeedState,
  (state) => state.loading
);

export const selectNewsTotal = createSelector(
  selectHomeState,
  (state) => state.newsTotal
);

export const selectNewsOffset = createSelector(
  selectHomeState,
  (state) => state.newsOffset
);

export const selectNewsLoadingMore = createSelector(
  selectHomeState,
  (state) => state.newsLoadingMore
);

export const selectNewsHasMore = createSelector(
  selectHomeState,
  (state) => (state.newsFeed.data?.length ?? 0) < state.newsTotal
);
