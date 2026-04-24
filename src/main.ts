import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { APP_INITIALIZER } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/services/config.service';
import { appReducers, appMetaReducers } from './app/store';

function initializeApp(configService: ConfigService) {
  return () => configService.loadSettings();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true,
    },
    // ── NgRx Store ──────────────────────────────────────────────────────────
    // metaReducers order: transient (clean) → hydration (save)
    provideStore(appReducers, { metaReducers: appMetaReducers }),
    provideEffects([]), // add Effect classes here as you create them
  ],
});
