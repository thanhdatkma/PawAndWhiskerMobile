import { createReducer, on } from '@ngrx/store';
import { CheckoutActions } from './checkout.actions';
import { createInitialApiState } from '../../models/api-state.model';
import { CheckoutState } from '../../models/app-state.model';

export const initialState: CheckoutState = createInitialApiState();

export const checkoutReducer = createReducer(
  initialState,
  on(CheckoutActions.submitCheckout, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CheckoutActions.submitCheckoutSuccess, (state, { response }) => ({
    ...state,
    data: response,
    loading: false
  })),
  on(CheckoutActions.submitCheckoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CheckoutActions.resetCheckout, () => initialState)
);
