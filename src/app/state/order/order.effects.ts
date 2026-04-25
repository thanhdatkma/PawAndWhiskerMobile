import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '../../services/order.service';
import { OrderActions } from './order.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);
  private orderService = inject(OrderService);
  private toastController = inject(ToastController);

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      switchMap(() =>
        this.orderService.getOrders().pipe(
          map((orders) => OrderActions.loadOrdersSuccess({ orders })),
          catchError((error) => of(OrderActions.loadOrdersFailure({ error: error.message })))
        )
      )
    )
  );

  submitOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.submitOrder),
      switchMap(({ order }) =>
        this.orderService.submitOrder(order).pipe(
          map((newOrder) => OrderActions.submitOrderSuccess({ order: newOrder })),
          catchError((error) => of(OrderActions.submitOrderFailure({ error: error.message })))
        )
      )
    )
  );

  showError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.loadOrdersFailure, OrderActions.submitOrderFailure),
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
