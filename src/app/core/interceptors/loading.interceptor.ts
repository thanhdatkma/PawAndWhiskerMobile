import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, throwError, timer, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

const ERROR_HIDE_TIMEOUT_MS = 10_000;

let pendingRequests = 0;
let errorTimeoutSub: Subscription | null = null;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('assets/')) return next(req);

  const loadingService = inject(LoadingService);

  pendingRequests++;
  errorTimeoutSub?.unsubscribe();
  errorTimeoutSub = null;

  return from(loadingService.show()).pipe(
    switchMap(() =>
      next(req).pipe(
        tap({
          complete: () => {
            pendingRequests = Math.max(0, pendingRequests - 1);
            from(loadingService.hide()).subscribe();
          },
        }),
        catchError((error) => {
          pendingRequests = Math.max(0, pendingRequests - 1);
          if (pendingRequests === 0) {
            errorTimeoutSub = timer(ERROR_HIDE_TIMEOUT_MS)
              .pipe(switchMap(() => from(loadingService.hide())))
              .subscribe();
          } else {
            from(loadingService.hide()).subscribe();
          }
          return throwError(() => error);
        })
      )
    )
  );
};
