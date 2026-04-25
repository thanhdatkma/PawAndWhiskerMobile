import { createReducer, on } from '@ngrx/store';
import { OrderActions } from './order.actions';
import { createInitialApiState } from '../../models/api-state.model';
import { OrderState } from '../../models/app-state.model';

export const initialState: OrderState = createInitialApiState([]);

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.loadOrders, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    data: orders,
    loading: false
  })),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(OrderActions.submitOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrderActions.submitOrderSuccess, (state, { order }) => ({
    ...state,
    data: [...(state.data || []), order],
    loading: false
  })),
  on(OrderActions.submitOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
