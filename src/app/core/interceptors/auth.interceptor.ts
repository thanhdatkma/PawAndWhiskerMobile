import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { ConfigService } from '../../services/config.service';

/**
 * Interceptor to add Bearer token to HTTP requests for Medusa v2.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const configService = inject(ConfigService);
  const baseUrl = configService.settings?.baseUrl;
  const publishableApiKey = configService.settings?.publishableApiKey;
  const consumerApiKey = configService.settings?.consumerApiKey;

  // If the request is to a different domain (like assets/settings), skip adding the token
  if (req.url.includes('assets/settings/') || (baseUrl && !req.url.startsWith(baseUrl) && !req.url.startsWith('/'))) {
    return next(req);
  }

  return from(storageService.get<string>('auth_token')).pipe(
    switchMap((token) => {
      const headers: Record<string, string> = {};
      const isMobiConnectorRequest = req.url.includes('/mobiconnector/v1/');
      // This flag to using for Medusa login
      // const publishableApiKey = configService.settings?.publishableApiKey;
      // if (publishableApiKey) {
      //   headers['x-publishable-api-key'] = publishableApiKey;
      // }
      if (publishableApiKey) {
        headers['x-publishable-api-key'] = publishableApiKey;
      }

      if (consumerApiKey) {
        headers['x-consumer-api-key'] = consumerApiKey;
      }

      if (token) {
        if (isMobiConnectorRequest) {
          headers['X-Mobile-Token'] = token;
        } else {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }

      const authReq = req.clone({ setHeaders: headers });
      return next(authReq);
    })
  );
};
