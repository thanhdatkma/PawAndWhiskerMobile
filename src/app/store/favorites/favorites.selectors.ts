import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from '../../models/app-state.model';

export const selectFavoritesState =
  createFeatureSelector<FavoritesState>('favorites');

export const selectFavoriteIds = createSelector(
  selectFavoritesState,
  (s) => s.ids,
);

export const selectFavoriteCount = createSelector(
  selectFavoriteIds,
  (ids) => ids.length,
);

export const selectIsFavorite = (productId: string) =>
  createSelector(selectFavoriteIds, (ids) => ids.includes(productId));

export const selectFavoritesIsLoading = createSelector(
  selectFavoritesState,
  (s) => s.isLoading,
);

export const selectFavoritesError = createSelector(
  selectFavoritesState,
  (s) => s.error,
);
