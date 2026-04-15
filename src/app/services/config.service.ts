import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  label: string;
}

export interface AppSettings {
  activeCurrency: string;
  supportedCurrencies: CurrencyConfig[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private settingsSubject = new BehaviorSubject<AppSettings | null>(null);
  public settings$ = this.settingsSubject.asObservable();

  constructor(private http: HttpClient) {}

  async loadSettings(): Promise<void> {
    try {
      const settings = await firstValueFrom(
        this.http.get<AppSettings>('assets/settings/appsettings.config.json')
      );
      this.settingsSubject.next(settings);
    } catch (error) {
      console.error('Failed to load app settings', error);
      // Fallback
      this.settingsSubject.next({
        activeCurrency: 'USD',
        supportedCurrencies: [{ code: 'USD', symbol: '$', label: 'US Dollar' }]
      });
    }
  }

  get activeCurrencySymbol(): string {
    const settings = this.settingsSubject.value;
    if (!settings) return '$';
    const active = settings.supportedCurrencies.find(c => c.code === settings.activeCurrency);
    return active?.symbol ?? '$';
  }
}
