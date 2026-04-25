import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Checkout, CheckoutResponse } from '../../models/checkout.model';

export const CheckoutActions = createActionGroup({
  source: 'Checkout',
  events: {
    'Submit Checkout': props<{ checkout: Checkout }>(),
    'Submit Checkout Success': props<{ response: CheckoutResponse }>(),
    'Submit Checkout Failure': props<{ error: string }>(),
    'Reset Checkout': emptyProps(),
  }
});
