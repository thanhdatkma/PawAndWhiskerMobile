import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CheckoutService } from '../../services/checkout.service';
import { CheckoutActions } from './checkout.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';

@Injectable()
export class CheckoutEffects {
  private actions$ = inject(Actions);
  private checkoutService = inject(CheckoutService);
  private toastController = inject(ToastController);

  submitCheckout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.submitCheckout),
      switchMap(({ checkout }) =>
        this.checkoutService.submitCheckout(checkout).pipe(
          map((response) => CheckoutActions.submitCheckoutSuccess({ response })),
          catchError((error) => of(CheckoutActions.submitCheckoutFailure({ error: error.message })))
        )
      )
    )
  );

  showError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CheckoutActions.submitCheckoutFailure),
        tap(async ({ error }) => {
          const toast = await this.toastController.create({
            message: error,
            duration: 3000,
            color: 'danger',
            position: 'bottom',
          });
          await toast.present();
        })
      ),
    { dispatch: false }
  );
}
