import { Injectable, signal } from '@angular/core';
import { UserProfile } from '../models/user-profile.model';
import mockData from '../../../test/mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = signal<UserProfile | null>(null);
  currentUser = this._currentUser.asReadonly();

  isLoggedIn = signal<boolean>(false);

  constructor() {
    // Check local storage for session
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this._currentUser.set(user);
        this.isLoggedIn.set(true);
      } catch (e) {
        localStorage.removeItem('user_profile');
      }
    }
  }

  login = () => {
    const mockUser: UserProfile = mockData.user as any;
    this._currentUser.set(mockUser);
    this.isLoggedIn.set(true);
    localStorage.setItem('user_profile', JSON.stringify(mockUser));
  }

  logout() {
    this._currentUser.set(null);
    this.isLoggedIn.set(false);
    localStorage.removeItem('user_profile');
  }
}
