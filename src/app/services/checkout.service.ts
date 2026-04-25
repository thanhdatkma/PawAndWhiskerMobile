import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checkout, CheckoutResponse } from '../models/checkout.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.example.com/checkout'; // Placeholder .NET API

  submitCheckout(checkout: Checkout): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(this.apiUrl, checkout);
  }
}
