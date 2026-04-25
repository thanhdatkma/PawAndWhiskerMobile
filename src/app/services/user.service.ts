import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  /**
   * Fetches the user profile from the API.
   */
  getUserProfile(): Observable<UserProfile> {
    // In a real app, this would be an actual API endpoint.
    // For now, we'll assume it exists or use a mock URL.
    return this.http.get<UserProfile>('https://api.example.com/user/profile');
  }

  /**
   * Updates the user profile.
   */
  updateProfile(changes: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.patch<UserProfile>('https://api.example.com/user/profile', changes);
  }
}
