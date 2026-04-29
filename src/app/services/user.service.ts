import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { UserProfile } from '../models/user-profile.model';

interface MedusaCustomerResponse {
  customer: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  getUserProfile(): Observable<UserProfile> {
    return this.get<MedusaCustomerResponse>('store/customers/me').pipe(
      map(({ customer }) => ({
        id: customer.id,
        name: [customer.first_name, customer.last_name].filter(Boolean).join(' '),
        email: customer.email,
        avatar: '',
        membership: 'standard',
      }))
    );
  }

  updateProfile(changes: Partial<UserProfile>): Observable<UserProfile> {
    return this.post<MedusaCustomerResponse>('store/customers/me', {
      first_name: changes.name?.split(' ')[0] ?? '',
      last_name: changes.name?.split(' ').slice(1).join(' ') ?? '',
    }).pipe(
      map(({ customer }) => ({
        id: customer.id,
        name: [customer.first_name, customer.last_name].filter(Boolean).join(' '),
        email: customer.email,
        avatar: changes.avatar ?? '',
        membership: changes.membership ?? 'standard',
      }))
    );
  }
}
