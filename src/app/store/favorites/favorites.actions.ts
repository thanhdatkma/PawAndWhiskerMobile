import { createAction, props } from '@ngrx/store';

export const FavoritesActions = {
  toggle: createAction(
    '[Favorites] Toggle',
    props<{ productId: number }>(),
  ),
  addFavorite: createAction(
    '[Favorites] Add',
    props<{ productId: number }>(),
  ),
  removeFavorite: createAction(
    '[Favorites] Remove',
    props<{ productId: number }>(),
  ),
  loadFavoritesSuccess: createAction(
    '[Favorites] Load Success',
    props<{ ids: number[] }>(),
  ),
  loadFavoritesFailure: createAction(
    '[Favorites] Load Failure',
    props<{ error: string }>(),
  ),
  clearFavorites: createAction('[Favorites] Clear'),
};
