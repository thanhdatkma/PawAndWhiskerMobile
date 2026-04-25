import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import { cartReducer } from './cart/cart.reducer';
import { favoritesReducer } from './favorites/favorites.reducer';
import { userReducer } from './user/user.reducer';
import { productReducer, productListReducer } from '../state/product/product.reducer';
import { categoryReducer } from '../state/category/category.reducer';
import { orderReducer } from '../state/order/order.reducer';
import { checkoutReducer } from '../state/checkout/checkout.reducer';
import { homeReducer } from '../state/home/home.reducer';
import { transientMetaReducer } from '../shared/meta-reducers/transient.metareducer';
import { hydrationMetaReducer } from '../shared/meta-reducers/hydration.metareducer';

/**
 * Root reducer map keyed by AppState slice names.
 * Pass to provideStore(appReducers).
 */
export const appReducers: ActionReducerMap<AppState> = {
  cart: cartReducer,
  favorites: favoritesReducer,
  user: userReducer,
  product: productReducer,
  productList: productListReducer,
  category: categoryReducer,
  order: orderReducer,
  checkout: checkoutReducer,
  home: homeReducer,
};

/**
 * MetaReducers applied in left-to-right order:
 *   1. transientMetaReducer  – strips isLoading / error / etc. from persisted snapshot
 *   2. hydrationMetaReducer  – hydrates on INIT and persists on every action
 */
export const appMetaReducers: MetaReducer<AppState>[] = [
  transientMetaReducer,
  hydrationMetaReducer,
];

// ─── Re-exports for convenience ───────────────────────────────────────────────
export * from './cart/cart.actions';
export * from './cart/cart.selectors';
export * from './favorites/favorites.actions';
export * from './favorites/favorites.selectors';
export * from './user/user.actions';
export * from './user/user.selectors';
export * from '../state/product/product.actions';
export * from '../state/product/product.selectors';
export * from '../state/category/category.actions';
export * from '../state/category/category.selectors';
export * from '../state/order/order.actions';
export * from '../state/order/order.selectors';
export * from '../state/checkout/checkout.actions';
export * from '../state/checkout/checkout.selectors';
export * from '../state/home/home.actions';
export * from '../state/home/home.selectors';

