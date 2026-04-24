import { createReducer, on } from '@ngrx/store';
import { FavoritesState, initialFavoritesState } from '../../models/app-state.model';
import { FavoritesActions } from './favorites.actions';

export const favoritesReducer = createReducer<FavoritesState>(
  initialFavoritesState,

  on(FavoritesActions.toggle, (state, { productId }) => {
    const exists = state.ids.includes(productId);
    return {
      ...state,
      ids: exists
        ? state.ids.filter((id) => id !== productId)
        : [...state.ids, productId],
    };
  }),

  on(FavoritesActions.addFavorite, (state, { productId }) => ({
    ...state,
    ids: state.ids.includes(productId)
      ? state.ids
      : [...state.ids, productId],
  })),

  on(FavoritesActions.removeFavorite, (state, { productId }) => ({
    ...state,
    ids: state.ids.filter((id) => id !== productId),
  })),

  on(FavoritesActions.loadFavoritesSuccess, (state, { ids }) => ({
    ...state,
    ids,
    isLoading: false,
    error: null,
  })),

  on(FavoritesActions.loadFavoritesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(FavoritesActions.clearFavorites, (state) => ({
    ...state,
    ids: [],
  })),
);
