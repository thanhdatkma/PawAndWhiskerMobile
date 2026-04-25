import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastController } from '@ionic/angular/standalone';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private toastCtrl = inject(ToastController);

  /**
   * Effect to load user profile (Requirement 2 & 5)
   */
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadProfile),
      switchMap(() =>
        this.userService.getUserProfile().pipe(
          map((data) => UserActions.loadProfileSuccess({ data })),
          catchError((error) =>
            of(
              UserActions.loadProfileFailure({
                error: error.message || 'Failed to load profile',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect to update user profile
   */
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateProfile),
      switchMap(({ changes }) =>
        this.userService.updateProfile(changes).pipe(
          map((data) => UserActions.updateProfileSuccess({ data })),
          catchError((error) =>
            of(
              UserActions.updateProfileFailure({
                error: error.message || 'Failed to update profile',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Global Error Handling (Requirement 4)
   * Listens to all Failure actions and shows an Ionic Toast.
   */
  handleApiErrors$ = createEffect(
    () =>
      this.actions$.pipe(
        // Listen to any action ending in 'Failure'
        ofType(
          UserActions.loadProfileFailure,
          UserActions.updateProfileFailure,
          UserActions.loginFailure
        ),
        tap(async ({ error }) => {
          const toast = await this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'bottom',
            color: 'danger',
            buttons: [{ text: 'OK', role: 'cancel' }],
          });
          await toast.present();
        })
      ),
    { dispatch: false }
  );
}
