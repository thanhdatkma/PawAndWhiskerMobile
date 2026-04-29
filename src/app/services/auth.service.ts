import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';
import { UserProfile } from '../models/user-profile.model';

export const AUTH_TOKEN_KEY = 'auth_token';
export const AUTH_USER_KEY = 'user_profile';

export interface RegisterPayload {
  full_name: string;
  email: string;
  phone_number?: string;
  password: string;
  confirm_password: string;
  agree_terms: true;
}

export interface AuthApiResponse {
  token: string;
  customer: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export interface LoginApiResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private storageService = inject(StorageService);

  logout(): Observable<void> {
    return this.delete<void>('auth/logout', {}).pipe(
      switchMap(() => from(this.storageService.remove(AUTH_TOKEN_KEY)))
    );
  }
  register(payload: RegisterPayload): Observable<AuthApiResponse> {
    return this.post<AuthApiResponse>('store/register', payload);
  }

  login(email: string, password: string): Observable<LoginApiResponse> {
    return this.post<LoginApiResponse>('auth/customer/emailpass', { email, password });
  }

  static toUserProfile(customer: AuthApiResponse['customer']): UserProfile {
    return {
      id: customer.id,
      name: [customer.first_name, customer.last_name].filter(Boolean).join(' '),
      email: customer.email,
      avatar: '',
      membership: 'standard',
    };
  }

  static extractMessage(error: unknown, fallback = 'An error occurred'): string {
    if (error instanceof HttpErrorResponse) {
      const body = error.error;
      if (body?.errors?.length) return body.errors[0].message;
      if (body?.message) return body.message;
      if (error.status === 409) return 'Email is already registered';
      if (error.status === 0) return 'No internet connection';
    }
    if (error instanceof Error) return error.message;
    return fallback;
  }
}
