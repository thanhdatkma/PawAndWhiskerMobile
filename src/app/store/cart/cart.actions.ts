import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../models/app-state.model';
import { ProductBriefModel } from '../../models/product-brief.model';

export const CartActions = {
  addItem: createAction(
    '[Cart] Add Item',
    props<{ product: ProductBriefModel }>(),
  ),
  removeItem: createAction(
    '[Cart] Remove Item',
    props<{ productId: string }>(),
  ),
  updateQuantity: createAction(
    '[Cart] Update Quantity',
    props<{ productId: string; quantity: number }>(),
  ),
  clearCart: createAction('[Cart] Clear Cart'),
  loadCartSuccess: createAction(
    '[Cart] Load Cart Success',
    props<{ items: CartItem[] }>(),
  ),
  loadCartFailure: createAction(
    '[Cart] Load Cart Failure',
    props<{ error: string }>(),
  ),
};
