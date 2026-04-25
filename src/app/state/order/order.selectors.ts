import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../../models/app-state.model';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectAllOrders = createSelector(
  selectOrderState,
  (state) => state.data
);

export const selectOrdersLoading = createSelector(
  selectOrderState,
  (state) => state.loading
);

export const selectOrdersError = createSelector(
  selectOrderState,
  (state) => state.error
);
