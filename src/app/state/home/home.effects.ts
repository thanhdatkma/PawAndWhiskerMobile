import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HomeService } from '../../services/home.service';
import { HomeActions } from './home.actions';
import { catchError, map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
import { selectNewsOffset } from './home.selectors';

@Injectable()
export class HomeEffects {
  private actions$ = inject(Actions);
  private homeService = inject(HomeService);
  private store = inject(Store);
  private toastController = inject(ToastController);

  loadNewsFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadNewsFeed),
      switchMap(() =>
        this.homeService.getNewsFeed(10, 0).pipe(
          map((res) => HomeActions.loadNewsFeedSuccess({ newsFeed: res.data, total: res.total })),
          catchError((error) => of(HomeActions.loadNewsFeedFailure({ error: error.message })))
        )
      )
    )
  );

  loadMoreNewsFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadMoreNewsFeed),
      withLatestFrom(this.store.select(selectNewsOffset)),
      switchMap(([, offset]) =>
        this.homeService.getNewsFeed(10, offset).pipe(
          map((res) => HomeActions.loadMoreNewsFeedSuccess({ newsFeed: res.data, total: res.total })),
          catchError((error) => of(HomeActions.loadMoreNewsFeedFailure({ error: error.message })))
        )
      )
    )
  );

  showError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HomeActions.loadNewsFeedFailure, HomeActions.loadMoreNewsFeedFailure),
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
