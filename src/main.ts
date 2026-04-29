import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { APP_INITIALIZER } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore, Store } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/services/config.service';
import { StorageService } from './app/services/storage.service';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { loadingInterceptor } from './app/core/interceptors/loading.interceptor';
import { appReducers, appMetaReducers } from './app/store';
import { UserActions } from './app/store/user/user.actions';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from './app/services/auth.service';
import { UserProfile } from './app/models/user-profile.model';
import { UserEffects } from './app/store/user/user.effects';
import { ProductEffects } from './app/state/product/product.effects';
import { CategoryEffects } from './app/state/category/category.effects';
import { OrderEffects } from './app/state/order/order.effects';
import { CheckoutEffects } from './app/state/checkout/checkout.effects';
import { HomeEffects } from './app/state/home/home.effects';


function initializeApp(configService: ConfigService) {
  return () => configService.loadSettings();
}

function restoreSession(storageService: StorageService, store: Store) {
  return async () => {
    const [token, profile] = await Promise.all([
      storageService.get<string>(AUTH_TOKEN_KEY),
      storageService.get<UserProfile>(AUTH_USER_KEY),
    ]);
    if (token && profile) {
      store.dispatch(UserActions.restoreSession({ data: profile }));
    }
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([loadingInterceptor, authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: restoreSession,
      deps: [StorageService, Store],
      multi: true,
    },
    // ── NgRx Store ──────────────────────────────────────────────────────────
    // metaReducers order: transient (clean) → hydration (save)
    provideStore(appReducers, { metaReducers: appMetaReducers }),
    provideEffects([
      UserEffects,
      ProductEffects,
      CategoryEffects,
      OrderEffects,
      CheckoutEffects,
      HomeEffects,
    ]), // add Effect classes here as you create them

  ],
});
