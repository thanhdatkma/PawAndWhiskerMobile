import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { UserProfile } from '../models/user-profile.model';

export interface MobileProfileResponse {
  user: {
    id: number;
    email: string;
    full_name: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
    phone_number?: string;
    membership_tier?: string;
  };
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  avatar_url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  getUserProfile(): Observable<UserProfile> {
    return this.get<MobileProfileResponse>('mobiconnector/v1/auth/profile').pipe(
      map(({ user }) => this.mapToUserProfile(user))
    );
  }

  updateProfile(payload: UpdateProfilePayload): Observable<UserProfile> {
    const baseUrl = this.configService.settings?.baseUrl || '';
    return this.http.put<MobileProfileResponse>(`${baseUrl}mobiconnector/v1/auth/profile`, payload).pipe(
      map(({ user }) => this.mapToUserProfile(user))
    );
  }

  uploadAvatar(file: File): Observable<{ avatar_url: string }> {
    const baseUrl = this.configService.settings?.baseUrl || '';
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post<{ avatar_url: string }>(`${baseUrl}mobiconnector/v1/auth/uploadAvatar`, formData);
  }

  private mapToUserProfile(user: MobileProfileResponse['user']): UserProfile {
    return {
      id: String(user.id),
      name: user.full_name || [user.first_name, user.last_name].filter(Boolean).join(' '),
      email: user.email,
      avatar: user.avatar_url ?? '',
      membership: user.membership_tier ?? 'standard',
      phone: user.phone_number ?? '',
    };
  }
}
