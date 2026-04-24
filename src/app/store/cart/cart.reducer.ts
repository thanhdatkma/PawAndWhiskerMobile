import { createReducer, on } from '@ngrx/store';
import { CartState, initialCartState } from '../../models/app-state.model';
import { CartActions } from './cart.actions';

export const cartReducer = createReducer<CartState>(
  initialCartState,

  on(CartActions.addItem, (state, { product }) => {
    const existing = state.items.find((i) => i.product.id === product.id);
    const items = existing
      ? state.items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        )
      : [...state.items, { product, quantity: 1 }];
    return { ...state, items };
  }),

  on(CartActions.removeItem, (state, { productId }) => ({
    ...state,
    items: state.items.filter((i) => i.product.id !== productId),
  })),

  on(CartActions.updateQuantity, (state, { productId, quantity }) => ({
    ...state,
    items:
      quantity <= 0
        ? state.items.filter((i) => i.product.id !== productId)
        : state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i,
          ),
  })),

  on(CartActions.clearCart, (state) => ({ ...state, items: [] })),

  on(CartActions.loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    isLoading: false,
    error: null,
  })),

  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
