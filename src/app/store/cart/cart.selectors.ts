import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../../models/app-state.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(selectCartState, (s) => s.items);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (items) => items.reduce((acc, i) => acc + i.quantity, 0),
);

export const selectCartTotal = createSelector(
  selectCartItems,
  (items) =>
    items.reduce(
      (acc, i) =>
        acc + i.product.current_price * i.quantity,
      0,
    ),
);

export const selectCartIsLoading = createSelector(
  selectCartState,
  (s) => s.isLoading,
);

export const selectCartError = createSelector(
  selectCartState,
  (s) => s.error,
);
