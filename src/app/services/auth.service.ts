import { Injectable, inject } from '@angular/core';
import { Observable, from, of } from 'rxjs';
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
  user: {
    id: number;
    email: string;
    full_name: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
    phone_number: string;
    membership_tier: string;
  };
}

export interface LoginApiResponse {
  token: string;
  token_type: string;
  expires_in: number;
  user: AuthApiResponse['user'];
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface VerifyOtpResponse {
  message: string;
  reset_token: string;
}

export interface ResetPasswordResponse {
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private storageService = inject(StorageService);

  logout(): Observable<void> {
    this.storageService.remove(AUTH_TOKEN_KEY);
    return of(undefined);
  }
  register(payload: RegisterPayload): Observable<AuthApiResponse> {
    return this.post<AuthApiResponse>('mobiconnector/v1/auth/register', payload);
  }

  login(email: string, password: string): Observable<LoginApiResponse> {
    return this.post<LoginApiResponse>('mobiconnector/v1/auth/login', { email, password });
  }

  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    return this.post<ForgotPasswordResponse>('mobiconnector/v1/auth/forgot-password', { email });
  }

  verifyOtp(email: string, otp: string): Observable<VerifyOtpResponse> {
    return this.post<VerifyOtpResponse>('mobiconnector/v1/auth/verify-otp', { email, otp });
  }

  resetPassword(
    email: string,
    reset_token: string,
    new_password: string,
    confirm_password: string
  ): Observable<ResetPasswordResponse> {
    return this.post<ResetPasswordResponse>('mobiconnector/v1/auth/reset-password', {
      email,
      reset_token,
      new_password,
      confirm_password,
    });
  }

  static toUserProfile(user: AuthApiResponse['user']): UserProfile {
    return {
      id: String(user.id),
      name: user.full_name || [user.first_name, user.last_name].filter(Boolean).join(' '),
      email: user.email,
      avatar: user.avatar_url || '',
      membership: user.membership_tier || 'standard',
      phone: user.phone_number || '',
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
