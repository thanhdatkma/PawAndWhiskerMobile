import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order } from '../../models/order.model';

export const OrderActions = createActionGroup({
  source: 'Order',
  events: {
    'Load Orders': emptyProps(),
    'Load Orders Success': props<{ orders: Order[] }>(),
    'Load Orders Failure': props<{ error: string }>(),
    'Submit Order': props<{ order: any }>(),
    'Submit Order Success': props<{ order: Order }>(),
    'Submit Order Failure': props<{ error: string }>(),
  }
});
