import { createAction, props } from '@ngrx/store';

export const FavoritesActions = {
  toggle: createAction(
    '[Favorites] Toggle',
    props<{ productId: string }>(),
  ),
  addFavorite: createAction(
    '[Favorites] Add',
    props<{ productId: string }>(),
  ),
  removeFavorite: createAction(
    '[Favorites] Remove',
    props<{ productId: string }>(),
  ),
  loadFavoritesSuccess: createAction(
    '[Favorites] Load Success',
    props<{ ids: string[] }>(),
  ),
  loadFavoritesFailure: createAction(
    '[Favorites] Load Failure',
    props<{ error: string }>(),
  ),
  clearFavorites: createAction('[Favorites] Clear'),
};
