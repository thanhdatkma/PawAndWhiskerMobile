import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  label: string;
}

export interface AppSettings {
  isDarkmode: boolean;
  activeCurrency: string;
  supportedCurrencies: CurrencyConfig[];
  searchBarTabs: string[];
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
      this.applyTheme(settings.isDarkmode);
    } catch (error) {
      console.error('Failed to load app settings', error);
      // Fallback
      const fallback: AppSettings = {
        isDarkmode: false,
        activeCurrency: 'USD',
        supportedCurrencies: [{ code: 'USD', symbol: '$', label: 'US Dollar' }],
        searchBarTabs: ['home', 'categories']
      };

      this.settingsSubject.next(fallback);
      this.applyTheme(fallback.isDarkmode);
    }
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  public toggleDarkMode(): void {
    const current = this.settingsSubject.value;
    if (current) {
      const updated = { ...current, isDarkmode: !current.isDarkmode };
      this.settingsSubject.next(updated);
      this.applyTheme(updated.isDarkmode);
      // In a real app, we might want to save this back to storage or server
    }
  }

  get activeCurrencySymbol(): string {
    const settings = this.settingsSubject.value;
    if (!settings) return '$';
    const active = settings.supportedCurrencies.find(c => c.code === settings.activeCurrency);
    return active?.symbol ?? '$';
  }
}
