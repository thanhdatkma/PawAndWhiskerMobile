import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeService } from '../../services/home.service';
import { HomeActions } from './home.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
import mockData from '../../../../test/mock-data.json';
import { NewsBriefModel } from 'src/app/models/news-brief.model';
@Injectable()
export class HomeEffects {
  private actions$ = inject(Actions);
  private homeService = inject(HomeService);
  private toastController = inject(ToastController);

  loadNewsFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadNewsFeed),
      switchMap(() => {
        return of(HomeActions.loadNewsFeedSuccess({
          newsFeed: mockData.news_feed as NewsBriefModel[]
        }))
      }
        // this.homeService.getNewsFeed().pipe(
        //   map((newsFeed) => HomeActions.loadNewsFeedSuccess({ newsFeed })),
        //   catchError((error) => of(HomeActions.loadNewsFeedFailure({ error: error.message })))
        // )
      )
    )
  );

  showError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HomeActions.loadNewsFeedFailure),
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
