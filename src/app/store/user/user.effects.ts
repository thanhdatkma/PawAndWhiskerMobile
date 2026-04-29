import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastController } from '@ionic/angular/standalone';
import { of, from } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { AuthService, AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private storageService = inject(StorageService);
  private toastCtrl = inject(ToastController);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          switchMap((res) =>
            from(this.storageService.set(AUTH_TOKEN_KEY, res.token)).pipe(
              switchMap(() => this.userService.getUserProfile()),
              switchMap((data) =>
                from(this.storageService.set(AUTH_USER_KEY, data)).pipe(
                  map(() => UserActions.loginSuccess({ data, token: res.token }))
                )
              )
            )
          ),
          catchError((error) =>
            of(UserActions.loginFailure({ error: AuthService.extractMessage(error, 'Login failed') }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        tap(() => this.router.navigateByUrl('/home', { replaceUrl: true }))
      ),
    { dispatch: false }
  );

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadProfile),
      switchMap(() =>
        this.userService.getUserProfile().pipe(
          map((data) => UserActions.loadProfileSuccess({ data })),
          catchError((error) =>
            of(UserActions.loadProfileFailure({ error: AuthService.extractMessage(error, 'Failed to load profile') }))
          )
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateProfile),
      switchMap(({ changes }) =>
        this.userService.updateProfile(changes).pipe(
          map((data) => UserActions.updateProfileSuccess({ data })),
          catchError((error) =>
            of(UserActions.updateProfileFailure({ error: AuthService.extractMessage(error, 'Failed to update profile') }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      switchMap(({ payload }) =>
        this.authService.register(payload).pipe(
          map((res) =>
            UserActions.registerSuccess({
              data: AuthService.toUserProfile(res.customer),
              token: res.token,
            })
          ),
          catchError((error) =>
            of(UserActions.registerFailure({ error: AuthService.extractMessage(error, 'Registration failed') }))
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        tap(async () => {
          const toast = await this.toastCtrl.create({
            message: 'Registration successful! Please sign in.',
            duration: 3000,
            position: 'bottom',
            color: 'success',
            buttons: [{ text: 'OK', role: 'cancel' }],
          });
          await toast.present();
          this.router.navigateByUrl('/login', { replaceUrl: true });
        })
      ),
    { dispatch: false }
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logout),
        switchMap(() =>
          from(
            Promise.all([
              this.storageService.remove(AUTH_TOKEN_KEY),
              this.storageService.remove(AUTH_USER_KEY),
            ])
          ).pipe(map(() => UserActions.logoutSuccess()))
        )
      )
  );

  handleApiErrors$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UserActions.loadProfileFailure,
          UserActions.updateProfileFailure,
          UserActions.loginFailure,
          UserActions.registerFailure
        ),
        tap(async ({ error }) => {
          const toast = await this.toastCtrl.create({
            message: error,
            duration: 3500,
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
