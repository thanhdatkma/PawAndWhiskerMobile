import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckoutState } from '../../models/app-state.model';

export const selectCheckoutState = createFeatureSelector<CheckoutState>('checkout');

export const selectCheckoutResponse = createSelector(
  selectCheckoutState,
  (state) => state.data
);

export const selectCheckoutLoading = createSelector(
  selectCheckoutState,
  (state) => state.loading
);

export const selectCheckoutError = createSelector(
  selectCheckoutState,
  (state) => state.error
);
